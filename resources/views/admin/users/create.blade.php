@extends('layouts.admin')

@section('content')
    <div class="page-header">
        <div class="row align-items-end">
            <div class="col-lg-8">
                <div class="page-header-title">
                    <i class="ik ik-credit-card bg-blue"></i>
                    <div class="d-inline">
                        <h5>Create User</h5>
                        <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <nav class="breadcrumb-container" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="../../index.html"><i class="ik ik-home"></i></a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#">UI</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#">Basic</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Alerts</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>

    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header"><h3>Create an User Form</h3></div>
                <div class="card-body">
                    <form class="forms-sample"  method="POST" action="AdminUsersController@store">
                        {{ csrf_field() }}
                        <div class="form-group row">
                            <label for="name" class="col-sm-3 col-form-label">Name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="name" placeholder="Name">
                            </div>
                        </div>
                        {{-- <div class="form-group row">
                            <label for="exampleInputEmail2" class="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-9">
                                <input type="email" class="form-control" id="exampleInputEmail2" placeholder="Email">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="exampleInputMobile" class="col-sm-3 col-form-label">Mobile</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="exampleInputMobile" placeholder="Mobile number">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="exampleInputPassword2" class="col-sm-3 col-form-label">Password</label>
                            <div class="col-sm-9">
                                <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="exampleInputConfirmPassword2" class="col-sm-3 col-form-label">Re Password</label>
                            <div class="col-sm-9">
                                <input type="password" class="form-control" id="exampleInputConfirmPassword2" placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input">
                                <span class="custom-control-label">&nbsp;Remember me</span>
                            </label>
                        </div> --}}
                        <button type="submit" class="btn btn-primary mr-2">Create User</button>
                        <button class="btn btn-light">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection