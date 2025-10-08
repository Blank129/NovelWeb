/*
  # Create reading history table

  1. New Tables
    - `reading_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `novel_id` (text)
      - `novel_title` (text)
      - `novel_cover` (text)
      - `chapter_number` (integer)
      - `chapter_title` (text)
      - `progress` (integer, percentage)
      - `last_read_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `reading_history` table
    - Add policy for users to read their own history
    - Add policy for users to insert their own history
    - Add policy for users to update their own history
    - Add policy for users to delete their own history

  3. Indexes
    - Index on user_id for faster queries
    - Index on last_read_at for sorting
*/

CREATE TABLE IF NOT EXISTS reading_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  novel_id text NOT NULL,
  novel_title text NOT NULL,
  novel_cover text,
  chapter_number integer NOT NULL,
  chapter_title text NOT NULL,
  progress integer DEFAULT 0,
  last_read_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, novel_id, chapter_number)
);

ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reading history"
  ON reading_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading history"
  ON reading_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading history"
  ON reading_history FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reading history"
  ON reading_history FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_reading_history_user_id ON reading_history(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_history_last_read ON reading_history(last_read_at DESC);

INSERT INTO reading_history (user_id, novel_id, novel_title, novel_cover, chapter_number, chapter_title, progress, last_read_at)
SELECT 
  id as user_id,
  'novel-' || floor(random() * 10 + 1)::text as novel_id,
  CASE floor(random() * 5)::int
    WHEN 0 THEN 'Shadow Monarch Returns'
    WHEN 1 THEN 'Martial Peak'
    WHEN 2 THEN 'Tales of Demons and Gods'
    WHEN 3 THEN 'Solo Leveling'
    ELSE 'The Beginning After The End'
  END as novel_title,
  'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg' as novel_cover,
  floor(random() * 100 + 1)::int as chapter_number,
  'Chapter ' || floor(random() * 100 + 1)::text as chapter_title,
  floor(random() * 100)::int as progress,
  now() - (random() * interval '30 days') as last_read_at
FROM auth.users
LIMIT 5
ON CONFLICT (user_id, novel_id, chapter_number) DO NOTHING;