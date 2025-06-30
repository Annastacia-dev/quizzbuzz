import { Subject } from '../types';

export const subjects: Subject[] = [
  {
    id: 'american-history',
    name: 'American History',
    icon: '🇺🇸',
    color: 'from-red-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-red-500 to-blue-600',
    questions: [
      {
        id: '1',
        question: "What year was the Declaration of Independence signed?",
        answer: "1776",
        choices: ["1775", "1776", "1777", "1778"],
        difficulty: "medium",
        explanation: "The Declaration of Independence was signed on July 4, 1776."
      },
      {
        id: '2',
        question: "Who was the first President of the United States?",
        answer: "George Washington",
        choices: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        difficulty: "easy"
      },
      {
        id: '3',
        question: "Which war was fought from 1861 to 1865?",
        answer: "Civil War",
        choices: ["Revolutionary War", "War of 1812", "Civil War", "Spanish-American War"],
        difficulty: "medium"
      }
    ]
  },
  {
    id: 'pop-culture',
    name: 'Pop Culture',
    icon: '🎭',
    color: 'from-pink-500 to-purple-600',
    gradient: 'bg-gradient-to-br from-pink-500 to-purple-600',
    questions: [
      {
        id: '1',
        question: "Which social media app is known for short-form videos?",
        answer: "TikTok",
        choices: ["Instagram", "TikTok", "Snapchat", "Twitter"],
        difficulty: "easy"
      },
      {
        id: '2',
        question: "What does 'no cap' mean in Gen Z slang?",
        answer: "No lie/being honest",
        choices: ["No hat", "No limit", "No lie/being honest", "No problem"],
        difficulty: "medium"
      },
      {
        id: '3',
        question: "Which artist released the album 'Midnights' in 2022?",
        answer: "Taylor Swift",
        choices: ["Ariana Grande", "Taylor Swift", "Billie Eilish", "Dua Lipa"],
        difficulty: "easy"
      }
    ]
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    color: 'from-green-500 to-emerald-600',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
    questions: [
      {
        id: '1',
        question: "How many players are on a basketball team on the court at once?",
        answer: "5",
        choices: ["4", "5", "6", "7"],
        difficulty: "easy"
      },
      {
        id: '2',
        question: "Which country won the 2022 FIFA World Cup?",
        answer: "Argentina",
        choices: ["Brazil", "France", "Argentina", "Germany"],
        difficulty: "medium"
      },
      {
        id: '3',
        question: "In which sport would you perform a slam dunk?",
        answer: "Basketball",
        choices: ["Volleyball", "Tennis", "Basketball", "Badminton"],
        difficulty: "easy"
      }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🧪',
    color: 'from-cyan-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    questions: [
      {
        id: '1',
        question: "What is the chemical symbol for gold?",
        answer: "Au",
        choices: ["Go", "Au", "Ag", "Al"],
        difficulty: "medium"
      },
      {
        id: '2',
        question: "How many bones are in an adult human body?",
        answer: "206",
        choices: ["196", "206", "216", "226"],
        difficulty: "hard"
      },
      {
        id: '3',
        question: "What planet is known as the 'Red Planet'?",
        answer: "Mars",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        difficulty: "easy"
      }
    ]
  },
  {
    id: 'movies',
    name: 'Movies',
    icon: '🎬',
    color: 'from-yellow-500 to-orange-600',
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    questions: [
      {
        id: '1',
        question: "Which movie won the Academy Award for Best Picture in 2023?",
        answer: "Everything Everywhere All at Once",
        choices: ["Top Gun: Maverick", "Everything Everywhere All at Once", "The Banshees of Inisherin", "Avatar: The Way of Water"],
        difficulty: "medium"
      },
      {
        id: '2',
        question: "Who directed the movie 'Inception'?",
        answer: "Christopher Nolan",
        choices: ["Steven Spielberg", "Christopher Nolan", "Martin Scorsese", "Quentin Tarantino"],
        difficulty: "medium"
      },
      {
        id: '3',
        question: "In which movie franchise would you find the character 'Luke Skywalker'?",
        answer: "Star Wars",
        choices: ["Star Trek", "Star Wars", "Guardians of the Galaxy", "Interstellar"],
        difficulty: "easy"
      }
    ]
  },
  {
    id: 'brain-rot',
    name: 'Brain Rot TikTok',
    icon: '🧠',
    color: 'from-purple-500 to-pink-600',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
    questions: [
      {
        id: '1',
        question: "What does 'Ohio' mean in Gen Alpha slang?",
        answer: "Something weird or strange",
        choices: ["Cool", "Bad", "Something weird or strange", "Good"],
        difficulty: "medium"
      },
      {
        id: '2',
        question: "Complete the phrase: 'Only in...'",
        answer: "Ohio",
        choices: ["America", "Ohio", "TikTok", "2023"],
        difficulty: "easy"
      },
      {
        id: '3',
        question: "What does 'sigma' represent in internet culture?",
        answer: "Alpha male/dominant personality",
        choices: ["Smart person", "Alpha male/dominant personality", "Weird person", "Popular person"],
        difficulty: "medium"
      }
    ]
  }
];