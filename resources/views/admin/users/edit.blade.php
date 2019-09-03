@extends('layouts.admin')

@section('content')
    <div class="page-header">
        <div class="row align-items-end">
            <div class="col-lg-8">
                <div class="page-header-title">
                    <i class="ik ik-credit-card bg-blue"></i>
                    <div class="d-inline">
                        <h5>Edit User</h5>
                        <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <nav class="breadcrumb-container" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="{{ route('dashboard') }}"><i class="ik ik-home"></i> Dashboard</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="{{ route('admin.users') }}">Users</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Create</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>

    <div class="row">
            <div class="col-lg-4 col-md-5">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center"> 
                            <img src="{{ $user->photo ? url( $user->photo->path ) : 'https://fakeimg.pl/640x360' }}" class="rounded-circle" width="150" height="150" />
                            {{-- <img src="{{ url($user->photo->path ) }}" class="rounded-circle" width="150" /> --}}
                            <h4 class="card-title mt-10">{{ $user->name }}</h4>
                            <p class="card-subtitle">{{ $user->role->name }}</p>
                            <div class="row text-center justify-content-md-center">
                                <div class="col-4"><a href="javascript:void(0)" class="link"><i class="ik ik-user"></i> <font class="font-medium">254</font></a></div>
                                <div class="col-4"><a href="javascript:void(0)" class="link"><i class="ik ik-image"></i> <font class="font-medium">54</font></a></div>
                            </div>
                        </div>
                    </div>
                    <hr class="mb-0"> 
                    <div class="card-body"> 
                        <small class="text-muted d-block">Email address </small>
                        <h6>{{ $user->email }}</h6> 
                        <small class="text-muted d-block pt-10">Phone</small>
                        <h6>(123) 456 7890</h6> 
                        <small class="text-muted d-block pt-10">Address</small>
                        <h6>71 Pilgrim Avenue Chevy Chase, MD 20815</h6>
                        <div class="map-box">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085452149588!3d12.953959988118836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C+Karnataka!5e0!3m2!1sen!2sin!4v1542005497600" width="100%" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
                        </div> 
                        <small class="text-muted d-block pt-30">Social Profile</small>
                        <br/>
                        <button class="btn btn-icon btn-facebook"><i class="fab fa-facebook-f"></i></button>
                        <button class="btn btn-icon btn-twitter"><i class="fab fa-twitter"></i></button>
                        <button class="btn btn-icon btn-instagram"><i class="fab fa-instagram"></i></button>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-7">
                <div class="card">
                    <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-timeline-tab" data-toggle="pill" href="#current-month" role="tab" aria-controls="pills-timeline" aria-selected="true">Timeline</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#last-month" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-setting-tab" data-toggle="pill" href="#previous-month" role="tab" aria-controls="pills-setting" aria-selected="false">Settings</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="current-month" role="tabpanel" aria-labelledby="pills-timeline-tab">
                            <div class="card-body">
                                <div class="profiletimeline mt-0">
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="{{ $user->photo ? url( $user->photo->path ) : '' }}" alt="user" class="rounded-circle" /> </div>
                                        <div class="sl-right">
                                            <div><a href="javascript:void(0)" class="link">{{ $user->name }}</a> <span class="sl-date">5 minutes ago</span>
                                                <p>assign a new task <a href="javascript:void(0)"> Design weblayout</a></p>
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="../img/big/img2.jpg" class="img-fluid rounded" /></div>
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="../img/big/img3.jpg" class="img-fluid rounded" /></div>
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="../img/big/img4.jpg" class="img-fluid rounded" /></div>
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="../img/big/img5.jpg" class="img-fluid rounded" /></div>
                                                </div>
                                                <div class="like-comm"> 
                                                    <a href="javascript:void(0)" class="link mr-10">2 comment</a> 
                                                    <a href="javascript:void(0)" class="link mr-10"><i class="fa fa-heart text-danger"></i> 5 Love</a> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="{{ $user->photo ? url( $user->photo->path ) : '' }}" alt="user" class="rounded-circle" /> </div>
                                        <div class="sl-right">
                                            <div> <a href="javascript:void(0)" class="link">{{ $user->name }}</a> <span class="sl-date">5 minutes ago</span>
                                                <div class="mt-20 row">
                                                    <div class="col-md-3 col-xs-12"><img src="{{ $user->photo ? url( $user->photo->path ) : '' }}" alt="user" class="img-fluid rounded" /></div>
                                                    <div class="col-md-9 col-xs-12">
                                                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. </p> <a href="javascript:void(0)" class="btn btn-success"> Design weblayout</a>
                                                    </div>
                                                </div>
                                                <div class="like-comm mt-20"> 
                                                    <a href="javascript:void(0)" class="link mr-10">2 comment</a> 
                                                    <a href="javascript:void(0)" class="link mr-10"><i class="fa fa-heart text-danger"></i> 5 Love</a> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="{{ $user->photo ? url( $user->photo->path ) : '' }}" alt="user" class="rounded-circle" /> </div>
                                        <div class="sl-right">
                                            <div>
                                                <a href="javascript:void(0)" class="link">{{ $user->name }}</a> <span class="sl-date">5 minutes ago</span>
                                                <p class="mt-10"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper </p>
                                            </div>
                                            <div class="like-comm mt-20"> 
                                                <a href="javascript:void(0)" class="link mr-10">2 comment</a> 
                                                <a href="javascript:void(0)" class="link mr-10"><i class="fa fa-heart text-danger"></i> 5 Love</a> 
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="{{ $user->photo ? url( $user->photo->path ) : '' }}" alt="user" class="rounded-circle" /> </div>
                                        <div class="sl-right">
                                            <div><a href="javascript:void(0)" class="link">{{ $user->name }}</a> <span class="sl-date">5 minutes ago</span>
                                                <blockquote class="mt-10">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="last-month" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3 col-6"> <strong>Full Name</strong>
                                        <br>
                                        <p class="text-muted">{{ $user->name }}</p>
                                    </div>
                                    <div class="col-md-3 col-6"> <strong>Mobile</strong>
                                        <br>
                                        <p class="text-muted">(123) 456 7890</p>
                                    </div>
                                    <div class="col-md-3 col-6"> <strong>Email</strong>
                                        <br>
                                        <p class="text-muted">{{ $user->email }}</p>
                                    </div>
                                    <div class="col-md-3 col-6"> <strong>Location</strong>
                                        <br>
                                        <p class="text-muted">London</p>
                                    </div>
                                </div>
                                <hr>
                                <p class="mt-30">Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries </p>
                                <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                <h4 class="mt-30">Skill Set</h4>
                                <hr>
                                <h6 class="mt-30">Wordpress <span class="pull-right">80%</span></h6>
                                <div class="progress progress-sm">
                                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width:80%;"> <span class="sr-only">50% Complete</span> </div>
                                </div>
                                <h6 class="mt-30">HTML 5 <span class="pull-right">90%</span></h6>
                                <div class="progress  progress-sm">
                                    <div class="progress-bar bg-info" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width:90%;"> <span class="sr-only">50% Complete</span> </div>
                                </div>
                                <h6 class="mt-30">jQuery <span class="pull-right">50%</span></h6>
                                <div class="progress  progress-sm">
                                    <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:50%;"> <span class="sr-only">50% Complete</span> </div>
                                </div>
                                <h6 class="mt-30">Photoshop <span class="pull-right">70%</span></h6>
                                <div class="progress  progress-sm">
                                    <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%;"> <span class="sr-only">50% Complete</span> </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="previous-month" role="tabpanel" aria-labelledby="pills-setting-tab">
                            <div class="card-body">
                                    <form class="forms-sample"  method="POST" action="{{ route('users.update', $user->id) }}" enctype="multipart/form-data">
                                            {{ method_field('PATCH') }}
                                            {{ csrf_field() }}
                                            <div class="form-group row">
                                                <label for="name" class="col-sm-3 col-form-label">Name</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="name" name="name" placeholder="Name" value="{{ $user->name }}">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="email" class="col-sm-3 col-form-label">Email</label>
                                                <div class="col-sm-9">
                                                    <input type="email" class="form-control" id="email" name="email" placeholder="Email" value="{{ $user->email }}">
                                                </div>
                                            </div>
                                            {{-- <div class="form-group row">
                                                <label for="file" class="col-sm-3 col-form-label">Example file input</label>
                                                <div class="col-sm-9">
                                                    <input type="file" class="form-control-file" name="file" id="file">
                                                </div>
                                            </div> --}}
                                            {{-- {{ dd($user) }} --}}
                                            
                                            <div class="form-group row">
                                                <label for="role_id" class="col-sm-3 col-form-label">Role </label>
                                                <div class="col-sm-9">
                                                    <select class="form-control select2" id="role_id" name="role_id">
                                                    <option selected='selected' value="{{ $user->role->id }}">{{ $user->role->name }}</option>
                                                        @foreach ($roles as $role)
                                                            <option value="{{ $role->id }}">{{ $role->name }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="is_active" class="col-sm-3 col-form-label">Status </label>
                                                <div class="col-sm-9">
                                                    <select class="form-control select2" id="is_active" name="is_active">
                                                        <option selected='selected'>{{ $user->is_active == 1 ? 'Active' : 'Not Active' }}</option>
                                                        <option value="0">Not Active</option>
                                                        <option value="1">Active</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="password" class="col-sm-3 col-form-label">Password</label>
                                                <div class="col-sm-9">
                                                    <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-sm-9 ml-2">
                                                    <input type="file" class="custom-file-input" name="photo_id">
                                                    <label class="custom-file-label" for="photo_id">Choose file...</label>
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-primary mr-2">Update Profile</button>
                                            <button class="btn btn-light">Cancel</button>
                                        </form>
                                        @include('partials.errors')
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
@endsection