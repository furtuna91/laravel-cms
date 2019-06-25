@if (count($errors) > 0)
    <div class="alert alert-danger alert-dismissible my-3 fade show" role="alert">
        <strong>Holy guacamole!</strong>
        @foreach ($errors->all() as $error)
            <div class="d-block">{{ $error }}</div>
        @endforeach
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif