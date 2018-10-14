'use strict';

const Alexa = require('ask-sdk-core');
// 標準のSDKモジュールがインストールされている場合、'ask-sdk' を使用してください

// ハンドラーのコードはこちら

let skill;

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        ActorIntentHandler,
        
      )
      
      .create();
  }

  return skill.invoke(event,context);
}
     
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'ようこそ、有名人図鑑へ。';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const ActorIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ActorIntent';
    },
    handle(handlerInput) {
        var actor = handlerInput.requestEnvelope.request.intent.slots.actor.value
        if(actor === undefined){
        const speechText1 = '俳優ではありません。';
        return handlerInput.responseBuilder
            .speak(speechText1)
            .withSimpleCard('Hello World', speechText1)
            .getResponse();
        }else{
        const speechText = actor+'は俳優です。';
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
            
        }

        
    }
};