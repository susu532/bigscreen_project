<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Creates a default admin user for the system
     */
    public function run(): void
    {
        // Check if admin already exists
        $adminEmail = 'admin@survey.com';
        
        if (User::where('email', $adminEmail)->exists()) {
            $this->command->info('Admin user already exists.');
            return;
        }

        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => $adminEmail,
            'password' => Hash::make('admin123'), // Default password
            'email_verified_at' => now(),
        ]);

        // Add admin role or flag if needed
        // For now, we'll use the email to identify admin
        // In production, you should implement proper role management
        
        $this->command->info('Admin user created successfully!');
        $this->command->info('Email: ' . $adminEmail);
        $this->command->info('Password: admin123');
        $this->command->warn('Please change the default password after first login!');
    }
}