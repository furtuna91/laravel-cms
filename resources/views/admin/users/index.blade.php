@extends('layouts.admin')

@section('content')
    <h1>Users</h1>
    <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Active</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
          </tr>
        </thead>
        <tbody>
            @if (count($users) > 0)
                @foreach ($users as $user)
                    <tr>
                        <th scope="row">{{ $user->id }}</th>
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
      <div class="card">
            <div class="card-header row">
                <div class="col col-sm-3">
                    <div class="card-options d-inline-block">
                        <a href="#"><i class="ik ik-inbox"></i></a>
                        <a href="#"><i class="ik ik-plus"></i></a>
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
                            <table id="advanced_table" class="table dataTable no-footer dtr-inline collapsed" role="grid" aria-describedby="advanced_table_info" style="width: 1606px;">
                    <thead>
                        <tr role="row"><th class="nosort sorting_asc" rowspan="1" colspan="1" style="width: 28px;" aria-label="
                                
                                    
                                    &amp;nbsp;
                                
                            " width="10">
                                <label class="custom-control custom-checkbox m-0">
                                    <input type="checkbox" class="custom-control-input" id="selectall" name="" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                            </th>
                            <th class="nosort sorting_disabled" rowspan="1" colspan="1" style="width: 115px;" aria-label="Avatar">Avatar</th>
                            <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 224px;" aria-label="Name: activate to sort column ascending">Name</th>
                            <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 337px;" aria-label="Position: activate to sort column ascending">Position</th>
                            <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 174px;" aria-label="Office: activate to sort column ascending">Office</th>
                            <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 101px;" aria-label="Age: activate to sort column ascending">Age</th>
                            <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 179px;" aria-label="Start date: activate to sort column ascending">Start date</th>
                            <th class="sorting" tabindex="0" aria-controls="advanced_table" rowspan="1" colspan="1" style="width: 130px; display: none;" aria-label="Salary: activate to sort column ascending">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        
                        
                        
                        
                        
                        
                        
                        
                    <tr role="row" class="odd">
                            <td tabindex="0" class="sorting_1" style="">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input select_all_child" id="" name="" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                            </td>
                            <td><img src="img/users/1.jpg" class="table-user-thumb" alt=""></td>
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td style="display: none;">$320,800</td>
                        </tr><tr role="row" class="even">
                            <td tabindex="0" class="sorting_1">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input select_all_child" id="" name="" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                            </td>
                            <td><img src="img/users/2.jpg" class="table-user-thumb" alt=""></td>
                            <td>Garrett Winters</td>
                            <td>Accountant</td>
                            <td>Tokyo</td>
                            <td>63</td>
                            <td>2011/07/25</td>
                            <td style="display: none;">$170,750</td>
                        </tr><tr role="row" class="odd">
                            <td tabindex="0" class="sorting_1">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input select_all_child" id="" name="" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                            </td>
                            <td><img src="img/users/3.jpg" class="table-user-thumb" alt=""></td>
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009/01/12</td>
                            <td style="display: none;">$86,000</td>
                        </tr><tr role="row" class="even">
                            <td tabindex="0" class="sorting_1">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input select_all_child" id="" name="" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                            </td>
                            <td><img src="img/users/4.jpg" class="table-user-thumb" alt=""></td>
                            <td>Cedric Kelly</td>
                            <td>Senior Javascript Developer</td>
                            <td>Edinburgh</td>
                            <td>22</td>
                            <td>2012/03/29</td>
                            <td style="display: none;">$433,060</td>
                        </tr><tr role="row" class="odd">
                            <td tabindex="0" class="sorting_1">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input select_all_child" id="" name="" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                            </td>
                            <td><img src="img/users/5.jpg" class="table-user-thumb" alt=""></td>
                            <td>Airi Satou</td>
                            <td>Accountant</td>
                            <td>Tokyo</td>
                            <td>33</td>
                            <td>2008/11/28</td>
                            <td style="display: none;">$162,700</td>
                        </tr><tr role="row" class="even">
                            <td tabindex="0" class="sorting_1">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input select_all_child" id="" name="" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                            </td>
                            <td><img src="img/users/1.jpg" class="table-user-thumb" alt=""></td>
                            <td>Brielle Williamson</td>
                            <td>Integration Specialist</td>
                            <td>New York</td>
                            <td>61</td>
                            <td>2012/12/02</td>
                            <td style="display: none;">$372,000</td>
                        </tr><tr role="row" class="odd">
                            <td tabindex="0" class="sorting_1">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input select_all_child" id="" name="" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                            </td>
                            <td><img src="img/users/2.jpg" class="table-user-thumb" alt=""></td>
                            <td>Herrod Chandler</td>
                            <td>Sales Assistant</td>
                            <td>San Francisco</td>
                            <td>59</td>
                            <td>2012/08/06</td>
                            <td style="display: none;">$137,500</td>
                        </tr><tr role="row" class="even">
                            <td tabindex="0" class="sorting_1">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input select_all_child" id="" name="" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                            </td>
                            <td><img src="img/users/3.jpg" class="table-user-thumb" alt=""></td>
                            <td>Rhona Davidson</td>
                            <td>Integration Specialist</td>
                            <td>Tokyo</td>
                            <td>55</td>
                            <td>2010/10/14</td>
                            <td style="display: none;">$327,900</td>
                        </tr><tr role="row" class="odd">
                            <td tabindex="0" class="sorting_1">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input select_all_child" id="" name="" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                            </td>
                            <td><img src="img/users/4.jpg" class="table-user-thumb" alt=""></td>
                            <td>Colleen Hurst</td>
                            <td>Javascript Developer</td>
                            <td>San Francisco</td>
                            <td>39</td>
                            <td>2009/09/15</td>
                            <td style="display: none;">$205,500</td>
                        </tr></tbody>
                </table></div></div><div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="advanced_table_info" role="status" aria-live="polite">Showing 1 to 9 of 9 entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="advanced_table_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="advanced_table_previous"><a href="#" aria-controls="advanced_table" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="advanced_table" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item next disabled" id="advanced_table_next"><a href="#" aria-controls="advanced_table" data-dt-idx="2" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
            </div>
        </div>
@stop