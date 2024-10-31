import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};


const IS_HE = {
  name : "bicha",
  description: "Identifica se o membro da JC é viado ou não é",
  type: 1,
  options: [
    {
      type: 3, //string
      name: "membro",
      description: "Morador da JC",
      required: true
    }
  ],
  integration_types: [0,1]

}

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, IS_HE];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
