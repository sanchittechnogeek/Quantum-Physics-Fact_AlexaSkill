/*

Alexa Skill Developer: @sanchittechnogeek

Quantum Physics Fact: Backend Lambda Function

*/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace 'XXXXX'with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const SKILL_NAME = 'Quantum Physics Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const repromptOutput = 'Would you like to learn another fact?';
const HELP_MESSAGE = 'You can say tell me a quantum physics fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'Virtual Particles are some tiny things that pop in and out of existence randomly.',
    'Superposition states the smaller something is, the more likely it is to be in multiple places at once.',
    'Quantum Tunnelling lets particles teleport from one place to another.',
    'Quantum Entanglement enables tiny particles to interact with each other instantaneously over any distances.',
    'String theory states Everything Is Made Of Waves; Also, Particles.',
    'All the matter that makes up the human race could fit in a sugar cube.',
    'Quantum Retrocausality states events in the future can affect what happened in the past.',
    'According to multiverse theory, There are an infinite number of alexas writing this, and an infinite number of yous reading it.',
    'Black holes aren’t really black.',
    'The fundamental description of the universe does not account for a past, present or future.',
    'Schrodingers Cat experiments states when a cat placed in a sealed box alongside a radioactive isotope, the cat is Dead and Alive at the same time unless and until observed.',
    'The universe has no center',
    'String theory says that everything in this universe is a vibration on a strand known as “strings”.',
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;
        
        this.attributes.lastSpeech = randomFact; //adding the last fact to the session attributes, so we can use it to repeat it if requested by the user. 

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput + "  Would you like another fact?").listen("Would you like another fact?");
        this.emit(':responseReady');
    },
    'AMAZON.RepeatIntent': function () { 
        this.response.speak(this.attributes.lastSpeech + "  Would you like another fact?").listen("Would you like another fact?"); 
        this.emit(':responseReady'); 
    },
    'AMAZON.YesIntent': function () { 
        this.emit("GetNewFactIntent"); 
    }, 
    'AMAZON.NoIntent': function () { 
        this.response.speak(STOP_MESSAGE); 
        this.emit(':responseReady'); 
    }, 
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
     const speech_output = 'I\'m sorry, but I\'m not sure what you asked me.!'
     this.emit(':tell', speech_output);
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
 }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
