@extends('layouts.admin')

@section('content')
    <div class="page-header">
        <div class="row align-items-end">
            <div class="col-lg-8">
                <div class="page-header-title">
                    <i class="ik ik-credit-card bg-blue"></i>
                    <div class="d-inline">
                        <h5>Users</h5>
                        <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <nav class="breadcrumb-container" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="{{ route('dashboard') }}"><i class="ik ik-home"></i>Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">All Users</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header row">
            <div class="col col-sm-3">
                <div class="card-options d-inline-block">
                    <a href="#"><i class="ik ik-inbox"></i></a>
                    <a href="{{ route('admin.users.create') }}"><i class="ik ik-plus"></i></a>
                    <a href="#"><i class="ik ik-rotate-cw"></i></a>
                    <div class="dropdown d-inline-block">
                        <a class="nav-link dropdown-toggle" href="#" id="moreDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ik ik-more-horizontal"></i></a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="moreDropdown" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(30px, 30px, 0px);">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">More Action</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-sm-6">
                <div class="card-search with-adv-search dropdown">
                    <form action="" class="">
                        <input type="text" class="form-control global_filter" id="global_filter" placeholder="Search.." required="">
                        <button type="submit" class="btn btn-icon"><i class="ik ik-search"></i></button>
                        <button type="button" id="adv_wrap_toggler" class="adv-btn ik ik-chevron-down dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                        <div class="adv-search-wrap dropdown-menu dropdown-menu-right" aria-labelledby="adv_wrap_toggler" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(736px, 30px, 0px);">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input type="text" class="form-control column_filter" id="col0_filter" placeholder="Name" data-column="0">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control column_filter" id="col1_filter" placeholder="Position" data-column="1">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control column_filter" id="col2_filter" placeholder="Office" data-column="2">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text" class="form-control column_filter" id="col3_filter" placeholder="Age" data-column="3">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text" class="form-control column_filter" id="col4_filter" placeholder="Start date" data-column="4">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text" class="form-control column_filter" id="col5_filter" placeholder="Salary" data-column="5">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text" class="form-control column_filter" id="col6_filter" placeholder="Salary" data-column="6">
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-theme">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col col-sm-3">
                <div class="card-options text-right">
                    <span class="mr-5" id="top">1 - 50 of 2,500</span>
                    <a href="#"><i class="ik ik-chevron-left"></i></a>
                    <a href="#"><i class="ik ik-chevron-right"></i></a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div id="advanced_table_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <div class="dataTables_length" id="advanced_table_length">
                            <label>Show 
                                <select name="advanced_table_length" aria-controls="advanced_table" class="custom-select custom-select-sm form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select> entries
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div id="advanced_table_filter" class="dataTables_filter">
                            <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="advanced_table"></label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <table id="advanced_table" class="table dataTable no-footer dtr-inline collapsed mx-0" role="grid" aria-describedby="advanced_table_info" style="width: 100%;">
                            <thead>
                                <tr role="row">
                                    <th class="nosort sorting_asc" rowspan="1" colspan="1" style="width: 28px;" aria-label="&amp;nbsp;" width="10">
                                        <label class="custom-control custom-checkbox m-0">
                                            <input type="checkbox" class="custom-control-input" id="selectall" name="" value="option2">
                                            <span class="custom-control-label">&nbsp;</span>
                                        </label>
                                    </th>
                                    <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 101px;" aria-label="Age: activate to sort column ascending">Id</th>
                                    <th class="nosort sorting_disabled" rowspan="1" colspan="1" style="width: 115px;" aria-label="Avatar">Avatar</th>
                                    <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 224px;" aria-label="Name: activate to sort column ascending">Name</th>
                                    <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 337px;" aria-label="Position: activate to sort column ascending">Email</th>
                                    <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 174px;" aria-label="Office: activate to sort column ascending">Role</th>
                                    <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 101px;" aria-label="Age: activate to sort column ascending">Status</th>
                                    <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 179px;" aria-label="Start date: activate to sort column ascending">Created</th>
                                    <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 179px;" aria-label="End  date: activate to sort column ascending">Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                @if (count($users) > 0)
                                    @foreach ($users as $user)
                                        <tr role="row" class="odd">
                                            <td tabindex="0" class="sorting_1" style="">
                                                <label class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input select_all_child" id="" name="" value="option2">
                                                    <span class="custom-control-label">&nbsp;</span>
                                                </label>
                                            </td>
                                            <td>{{ $user->id }}</td>
                                            <td><img src="{{ $user->photo ? $user->photo->path : '' }}" class="table-user-thumb" alt=""></td>
                                            {{-- <td>{{ $user->photo ? $user->photo->path : '' }}</td> --}}
                                            <td>{{ $user->name }}</td>
                                            <td>{{ $user->email }}</td>
                                            <td>{{ $user->role->name }}</td>
                                            <td>
                                                {{ $user->is_active == 1 ? 'Active' : 'Not Active' }}
                                            </td>
                                            <td>{{ $user->created_at->diffForHumans() }}</td>
                                            <td>{{ $user->updated_at->diffForHumans() }}</td>
                                        </tr>
                                    @endforeach
                                @endif
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-5">
                        <div class="dataTables_info" id="advanced_table_info" role="status" aria-live="polite">Showing 1 to 9 of 9 entries</div>
                    </div>
                    <div class="col-sm-12 col-md-7">
                        <div class="dataTables_paginate paging_simple_numbers" id="advanced_table_paginate">
                            <ul class="pagination">
                                <li class="paginate_button page-item previous disabled" id="advanced_table_previous">
                                    <a href="#" aria-controls="advanced_table" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                                </li>
                                <li class="paginate_button page-item active">
                                    <a href="#" aria-controls="advanced_table" data-dt-idx="1" tabindex="0" class="page-link">1</a>
                                </li>
                                <li class="paginate_button page-item next disabled" id="advanced_table_next">
                                    <a href="#" aria-controls="advanced_table" data-dt-idx="2" tabindex="0" class="page-link">Next</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop