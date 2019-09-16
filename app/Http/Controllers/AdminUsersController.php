<?php

namespace App\Http\Controllers;

use App\User;
use App\Role;
use App\Photo;
use Illuminate\Http\Request;
use App\Http\Requests\UsersRequest;
use App\Http\Requests\UsersEditRequest;

class AdminUsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $users = User::all();
        return view('admin.users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $roles = Role::all();
        // $roles = Role::get()->pluck('title');
        return view('admin.users.create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UsersRequest $request)
    {
        if ( trim($request->password == '') ) 
        {
            # code...
            $input = $request->except('password');
        } else
        {
            $input = $request->all();
            $input['password'] = bcrypt($request->password);
        }

        if ($path = $request->file('photo_id')) {
            # code...
            $name = time() . $path->getClientOriginalName();

            $path->move('images', $name);

            $photo = Photo::create(['path'=>$name]);

            $input['photo_id'] = $photo->id;


            // return 'photo exists';
        }
        User::create($input);
        
        return redirect('admin/users')->with('status', 'Profile created!');
        //
        // return $request->all();
        // User::create($request->all());
        // return redirect('/admin/users');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return view('admin.users.show');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $user = User::findOrFail($id);
        $roles = Role::all();
        return view('admin.users.edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UsersEditRequest $request, $id)
    {
        //
        $user = User::findOrFail($id);
        // dd($input);

        if ( trim($request->password == '') ) 
        {
            # code...
            $input = $request->except('password');
        } else
        {
            $input = $request->all();
            $input['password'] = bcrypt($request->password);
        }

        if ($path = $request->file('photo_id')) {
            # code...
            $name = time() . $path->getClientOriginalName();

            $path->move('images', $name);

            $photo = Photo::create(['path'=>$name]);

            $input['photo_id'] = $photo->id;


            // return 'photo exists';
        }
        // if ( is_null($input['password']) ) {
        //     # code...
        //     $input['password'] = $user->password;
        // }
        // if ( is_null($request->) )
        // return $request->all();
        // dd($input);
        $user->update($input);
        return redirect()->route('admin.users');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $user = User::FindOrFail($id)->delete();
        // redirect()->route('admin.users');
        return redirect('admin/users')->with('status', 'Profile deleted!');
    }
}
