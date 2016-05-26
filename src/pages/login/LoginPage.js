import React from 'react';

var DefaultLayout = require('../_layouts/DefaultLayout');

;
import {Login} from '../../components';

var content =
    <div>
        <h1>Login</h1>
        <Login username="masc" placeholder='the username'/>
    </div>;

export default <DefaultLayout children={content} title="login"/>