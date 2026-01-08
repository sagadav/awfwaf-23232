<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resume_distributions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Distribution settings
            $table->string('status')->default('active'); // active, paused, completed, failed
            $table->integer('target_applications')->default(0); // How many applications to send
            $table->integer('applications_sent')->default(0); // Counter
            
            // HH.ru search filters (stored as JSON)
            $table->json('search_filters')->nullable(); // keywords, salary, experience, etc.
            $table->json('excluded_companies')->nullable(); // Companies to skip
            
            $table->string('resume_link')->nullable();
            $table->string('vacancy_link')->nullable();

            // Scheduling
            $table->integer('daily_limit')->default(50); // Max applications per day
            $table->time('start_time')->nullable(); // When to start sending (e.g., 09:00)
            $table->time('end_time')->nullable(); // When to stop (e.g., 18:00)
            
            // Statistics
            $table->integer('views_count')->default(0);
            $table->integer('responses_count')->default(0);
            $table->timestamp('last_sent_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resume_distributions');
    }
};
