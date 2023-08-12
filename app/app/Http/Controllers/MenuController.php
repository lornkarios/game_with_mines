<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class MenuController extends Controller
{
    public function list()
    {
        return response()->json(["НОВАЯ ИГРА", "НАСТРОЙКИ", "ВЫЙТИ"]);
    }
}
