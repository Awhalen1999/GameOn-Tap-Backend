import { Ruleset } from '../types';

const rulesets: Ruleset[] = [
  {
    id: '0',
    gameId: 'KingsCup',
    userId: '0',
    name: 'Default Kings Cup Ruleset',
    rules: {
      '2': {
        result: 'Two',
        title: 'You',
        description: 'Whoever draws this can choose anyone to take a drink.',
      },
      '3': {
        result: 'Three',
        title: 'Me',
        description: 'The person who draws this takes a drink.',
      },
      '4': {
        result: 'Four',
        title: 'Floor',
        description: 'The last person to touch the floor takes a drink.',
      },
      '5': {
        result: 'Five',
        title: 'Guys',
        description: 'All the guys at the table drink.',
      },
      '6': {
        result: 'Six',
        title: 'Chicks',
        description: 'All the girls at the table drink.',
      },
      '7': {
        result: 'Seven',
        title: 'Heaven',
        description:
          'If you draw this card, raise your hand above you head. Every other player must do so as well. The last person takes a drink.',
      },
      '8': {
        result: 'Eight',
        title: 'Mate',
        description:
          'Choose someone to be your mate. For the rest of the game, they drink when you drink.',
      },
      '9': {
        result: 'Nine',
        title: 'Rhyme',
        description:
          "You say a word, then the person to your right has to say a word that rhymes. This continues until someone can't think of a word. That person takes a drink. You can't reuse words.",
      },
      '10': {
        result: 'Ten',
        title: 'Categories',
        description:
          "Come up with a category of things. The person to your right must name something that falls within the category. This continues until someone can't think of something. That person takes a drink.",
      },
      J: {
        result: 'Jack',
        title: 'Thumb Master',
        description:
          'If you draw this card, place your thumb on the table. Every other player must do so as well. The last person takes a drink.',
      },
      Q: {
        result: 'Queen',
        title: 'Question Master',
        description:
          'Stick this card to your forehead. Any question you ask while this card is on your forehead, the first person to answer must take a drink. This continues until someone can remove the card without physical touch, the card falls off, or another player draws the question master.',
      },
      K: {
        result: 'King',
        title: "King's Cup",
        description:
          "When each of the first 3 Kings is drawn, the person who drew it puts some of their drink into the King's Cup in the center of the table.",
      },
      A: {
        result: 'Ace',
        title: 'Waterfall',
        description:
          'Each player starts drinking at the same time as the person to their left. NO player can stop drinking until the person before them stops.',
      },
      AS: {
        result: 'Ace of Spades',
        title: 'Ace of Spades',
        description:
          'You may choose one of the following options: 1. Choose one player to finish their entire drink, 2. Everyone at the table takes a drink.',
      },
      LastK: {
        result: 'Last King',
        title: 'Last King',
        description:
          'The person who draws the last King must drink the entire King’s Cup.',
      },
    },
  },
  {
    id: '0',
    gameId: 'RideTheBus',
    userId: '0',
    name: 'Default Ride The Bus Ruleset',
    rules: {
      '1': {
        result: 'Ride The Bus Rules',
        title: 'Objective',
        description:
          'Pick a number of seats for the bus ride. Each seat will be 1 card. The goal is to guess the next cards value correctly. If you guess correctly, you move on to the next seat. If you guess incorrectly, you drink and start over. If you successfully make it through all seats you may get off the bus.',
      },
      '2': {
        result: 'Higher/Lower',
        title: 'Higher/Lower',
        description:
          'Correctly guess if the next card drawn from the deck will be Higher, Lower, or Equal to the current cards value. (A is lowest K is highest) .',
      },
      '3': {
        result: 'Red/Black',
        title: 'Red/Black',
        description:
          'Correctly guess if the next card drawn from the deck will be Red (Heart or Diamond) or Black (Spade or Club).',
      },
    },
  },
  {
    id: '0',
    gameId: 'Snap',
    userId: '0',
    name: 'Default Snap Ruleset',
    rules: {
      '1': {
        result: 'Value',
        title: 'Value',
        description:
          'Snap when the value of the cards are the same. ex. 2 of hearts and 2 of spades.',
      },
      '2': {
        result: 'Suit',
        title: 'Suit',
        description:
          'Snap when the suit of the cards are the same. ex. 2 of hearts and 3 of hearts.',
      },
    },
  },
  {
    id: '0',
    gameId: 'Trivia',
    userId: '0',
    name: 'Default Trivia Ruleset',
    rules: {
      '1': {
        result: 'Trivia Rules',
        title: 'Objective',
        description: 'Correctly answer the trivia questions to win.',
      },
      '2': {
        result: 'VS Mode',
        title: 'VS Mode',
        description:
          'Each player receives a predetermined number of trivia questions. Player with the lowest score drinks. ',
      },
      '3': {
        result: 'Card-by-Card',
        title: 'Card-by-Card',
        description:
          'Players take turns answering 1 question at a time. Guess correctly, you are safe. Guess incorrectly, you drink.',
      },
    },
  },
  {
    id: '0',
    gameId: 'PromptDash',
    userId: '0',
    name: 'Default Prompt Dash Ruleset',
    rules: {
      '1': {
        result: 'Prompt Dash Rules',
        title: 'Objective',
        description:
          'Draw a random prompt card from the deck and race against other players to complete the challenge as quickly as possible to avoid the punishment.',
      },
    },
  },
  {
    id: '0',
    gameId: 'DiceRoll',
    userId: '0',
    name: 'Default Dice Roll Ruleset',
    rules: {
      '2': {
        result: 'Two',
        title: 'Two for You',
        description:
          'Whoever rolls this can choose anyone to take 2 sips from their drink.',
      },
      '3': {
        result: 'Three',
        title: 'Me',
        description: 'The roller takes 1 drink.',
      },
      '4': {
        result: 'Four',
        title: 'Pass it on',
        description:
          'The roller is protected from their next drink, the player to their left must take it instead.',
      },
      '5': {
        result: 'Five',
        title: 'Give and Take',
        description: 'Give out 3 drinks, and take 2 yourself.',
      },
      '6': {
        result: 'Six',
        title: 'Double Whammy',
        description:
          'Players on the rollers left and right must both take a drink. The roller is safe.',
      },
      '7': {
        result: 'Seven',
        title: 'Lucky Seven',
        description: 'The roller is safe from drinking until their next turn.',
      },
      '8': {
        result: 'Eight',
        title: 'Odd or Even',
        description:
          'The roller predicts whether the next roll will be odd or even. If correct, they choose someone to drink. If incorrect, they drink.',
      },
      '9': {
        result: 'Nine',
        title: 'Social',
        description: 'Everyone Drinks.',
      },
      '10': {
        result: 'Ten',
        title: 'Perfect Ten',
        description:
          'If both dice show the number 5, everyone else drinks. Otherwise the roller drinks.',
      },
      '11': {
        result: 'Eleven',
        title: 'Rule Master',
        description:
          'Make a rule that everyone must follow until the next "Eleven" is rolled. Anyone who breaks the rule drinks.',
      },
      '12': {
        result: 'Twelve',
        title: 'Midnight',
        description: 'Everyone finishes or takes 3 sips from their drink.',
      },
    },
  },
  {
    id: '0',
    gameId: 'DrinkRoulette',
    userId: '0',
    name: 'Default Drink Roulette Ruleset',
    rules: {
      '1': {
        result: 'One',
        title: 'Straight Shot',
        description:
          "The Spinner take's a straight shot of liquor or 3 sips of another drink.",
      },
      '2': {
        result: 'Two',
        title: 'Choice',
        description: 'The spinner chooses another player to take a drink.',
      },
      '3': {
        result: 'Three',
        title: 'Water Break',
        description: " You're safe from drinking this round.",
      },
      '4': {
        result: 'Four',
        title: 'Mystery',
        description: 'Take a drink of a mystery concoction made by the group.',
      },
      '5': {
        result: 'Five',
        title: 'Mix It Up',
        description: 'Swap drinks with another player for a round.',
      },
      '6': {
        result: 'Six',
        title: 'Target',
        description: `Any "Spinner's Choice" spins automatically are given to you until your next turn.`,
      },
      '7': {
        result: 'Seven',
        title: 'Middle',
        description: "Players on spinner's right and left drink.",
      },
      '8': {
        result: 'Eight',
        title: 'Bartender',
        description:
          'The spinner creates a unique drink and chooses a player to enjoy it.',
      },
      '9': {
        result: 'Nine',
        title: 'Add or Take',
        description:
          'The spinner may choose to take 1 drink or add 1 drink and pass it on to the next player, who will be given the same choice. This can continue until the total reaches 4 drinks, at which point the last player must drink all 4.',
      },
      '10': {
        result: 'Ten',
        title: 'Generosity',
        description: 'The spinner generously makes all others players drink.',
      },
      '11': {
        result: 'Eleven',
        title: 'Right Hand',
        description: "Player on spinner's right drinks.",
      },
      '12': {
        result: 'Twelve',
        title: 'Spinner Drinks',
        description: 'The spinner takes a drink',
      },
    },
  },
  {
    id: '0',
    gameId: 'BountyBlast',
    userId: '0',
    name: 'Default Bounty Blast Ruleset',
    rules: {
      '1': {
        result: 'Empty Chest',
        title: 'Empty Chest',
        description: 'Safe! This chest is empty.',
      },
      '2': {
        result: 'Treasure',
        title: 'Treasure',
        description:
          'Congratulations! You found treasure! You may assign a drink to another player or be safe from your next bomb!',
      },
      '3': {
        result: 'Bomb',
        title: 'Bomb',
        description: 'Oh no! You found a bomb! Drink up!',
      },
    },
  },
];

export async function getRulesets(): Promise<Ruleset[]> {
  return rulesets;
}
