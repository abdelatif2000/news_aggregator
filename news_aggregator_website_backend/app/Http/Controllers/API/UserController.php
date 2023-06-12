<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PreferenceRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function updateUserPreferences(PreferenceRequest $request)
    {
        $request->validated();
        $user_id = Auth::id();
        $user = User::find($user_id);
        $user->sources = $request->input('sources');
        $user->categories = $request->input('categories');
        $user->authors = $request->input('authors');
        $user->save();
    }
    public function getUserPreferences(Request $request)
    {
        $user_id = Auth::id();
        $userPreferences =User::select('sources', 'categories', 'authors')->find($user_id);
        return response(compact('userPreferences'));
    }
}
