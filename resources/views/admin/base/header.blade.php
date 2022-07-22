<div class="row border-bottom">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        @if(config('backInfo.IS_CLOSE_MENU') == 1)
            <div class="navbar-header">
                <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
            </div>
        @endif
        <ul class="nav navbar-top-links navbar-right">
            <li>
                <span class="m-r-sm text-muted welcome-message">{{config('backInfo.WELCOME_TITLE')}}</span>
            </li>
            <li>
                <a href="/admin/sign/logout">
                    <i class="fa fa-sign-out"></i> {{config('backInfo.LOGOUT_BUTTON_TITLE')}}
                </a>
            </li>
        </ul>
    </nav>
</div>