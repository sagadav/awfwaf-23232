<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('resume_distributions', function (Blueprint $table) {
            $table->string('resume_hash', 64)->nullable()->after('resume_link');
            $table->string('resume_title')->nullable()->after('resume_hash');
        });
    }

    public function down(): void
    {
        Schema::table('resume_distributions', function (Blueprint $table) {
            $table->dropColumn(['resume_hash', 'resume_title']);
        });
    }
};
