@extends('layouts.admin')

@section('content')
    <h1>Create Users</h1>

    {{-- {!! Form::open(['method' == 'POST', 'action' => 'AdminUsersController@store']) !!}
        {{ csrf_field() }}
    {!! Form::close() !!} --}}
    <form method="POST" action="AdminUsersController@store">
            <input type="hidden" name="_method" value="POST">
        {{ csrf_field() }}
        {{-- {{ method_field('PUT') }} --}}
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Example input">
        </div>
        <button type="submit" class="btn btn-primary">Create User</button>
    </form>
@endsection