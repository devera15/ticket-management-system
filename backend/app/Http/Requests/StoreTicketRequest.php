<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:5', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'priority' => ['required', Rule::in(['Low', 'Medium', 'High', 'Urgent'])],
            'status' => ['required', Rule::in(['Open', 'In Progress', 'Resolved', 'Closed'])],
            'category' => ['required', Rule::in(['Hardware', 'Software', 'Network', 'Account', 'Other'])],
        ];
    }
}
