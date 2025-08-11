<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Seeds 20 customer satisfaction survey questions
     */
    public function run(): void
    {
        $questions = [
            // Question 1 - Email (Type B)
            [
                'question_text' => 'What is your email address?',
                'type' => 'B',
                'options' => null,
            ],
            
            // Question 2 - Overall Satisfaction (Type A)
            [
                'question_text' => 'How satisfied are you with our product/service overall?',
                'type' => 'A',
                'options' => ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
            ],
            
            // Question 3 - Product Quality (Type A)
            [
                'question_text' => 'How would you rate the quality of our product?',
                'type' => 'A',
                'options' => ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'],
            ],
            
            // Question 4 - Value for Money (Type A)
            [
                'question_text' => 'How would you rate the value for money of our product/service?',
                'type' => 'A',
                'options' => ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'],
            ],
            
            // Question 5 - Customer Service (Type A)
            [
                'question_text' => 'How satisfied are you with our customer service?',
                'type' => 'A',
                'options' => ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
            ],
            
            // Question 6 - Purchase Frequency (Type A) - Used in Dashboard Pie Chart
            [
                'question_text' => 'How often do you purchase from us?',
                'type' => 'A',
                'options' => ['Weekly', 'Monthly', 'Quarterly', 'Yearly', 'First Time'],
            ],
            
            // Question 7 - Recommendation Likelihood (Type A) - Used in Dashboard Pie Chart
            [
                'question_text' => 'How likely are you to recommend us to others?',
                'type' => 'A',
                'options' => ['Very Likely', 'Likely', 'Neutral', 'Unlikely', 'Very Unlikely'],
            ],
            
            // Question 8 - Preferred Contact Method (Type A)
            [
                'question_text' => 'What is your preferred method of contact?',
                'type' => 'A',
                'options' => ['Email', 'Phone', 'Chat', 'Social Media', 'In-Person'],
            ],
            
            // Question 9 - Problem Resolution (Type A)
            [
                'question_text' => 'How well were your issues resolved?',
                'type' => 'A',
                'options' => ['Completely Resolved', 'Mostly Resolved', 'Partially Resolved', 'Not Resolved', 'N/A'],
            ],
            
            // Question 10 - Product Category (Type A) - Used in Dashboard Pie Chart
            [
                'question_text' => 'Which product category do you purchase most?',
                'type' => 'A',
                'options' => ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Other'],
            ],
            
            // Question 11 - Ease of Use (Type C) - Used in Radar Chart
            [
                'question_text' => 'Rate the ease of use of our product (1-5)',
                'type' => 'C',
                'options' => null,
            ],
            
            // Question 12 - Product Features (Type C) - Used in Radar Chart
            [
                'question_text' => 'Rate the features of our product (1-5)',
                'type' => 'C',
                'options' => null,
            ],
            
            // Question 13 - Delivery Speed (Type C) - Used in Radar Chart
            [
                'question_text' => 'Rate our delivery speed (1-5)',
                'type' => 'C',
                'options' => null,
            ],
            
            // Question 14 - Website Experience (Type C) - Used in Radar Chart
            [
                'question_text' => 'Rate your website/app experience (1-5)',
                'type' => 'C',
                'options' => null,
            ],
            
            // Question 15 - Price Competitiveness (Type C) - Used in Radar Chart
            [
                'question_text' => 'Rate our pricing compared to competitors (1-5)',
                'type' => 'C',
                'options' => null,
            ],
            
            // Question 16 - Improvement Suggestions (Type B)
            [
                'question_text' => 'What improvements would you suggest for our product/service?',
                'type' => 'B',
                'options' => null,
            ],
            
            // Question 17 - Best Feature (Type B)
            [
                'question_text' => 'What do you like most about our product/service?',
                'type' => 'B',
                'options' => null,
            ],
            
            // Question 18 - Biggest Challenge (Type B)
            [
                'question_text' => 'What is your biggest challenge with our product/service?',
                'type' => 'B',
                'options' => null,
            ],
            
            // Question 19 - Additional Products (Type B)
            [
                'question_text' => 'What additional products/services would you like us to offer?',
                'type' => 'B',
                'options' => null,
            ],
            
            // Question 20 - Additional Comments (Type B)
            [
                'question_text' => 'Any additional comments or feedback?',
                'type' => 'B',
                'options' => null,
            ],
        ];

        // Insert all questions
        foreach ($questions as $question) {
            Question::create($question);
        }
    }
}