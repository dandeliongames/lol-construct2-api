// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

const dummyAlternatives = [
  { text: 'blu<b>e</b>', alternativeId: '1' },
  { text: 'gr<i>e</i>en', alternativeId: '2' },
  { text: 'r<b>e</b>d', alternativeId: '3' },
  { text: 'c<b><i>ya</i></b>n', alternativeId: '4' }
];

const dummyQuestion = {
	questionId: '1',
  stem: 'What <b>is</b> <i>your</i> favorite color?[IMAGE]<b>Seriously</b>?',
  before: 'What <b>is</b> <i>your</i> favorite color?',
  after: '<b>Seriously</b>?',
  correctAlternativeId: '1',
  alternatives: dummyAlternatives,
  imageURL: null
};

const EVENT = {
	RECEIVED: {
		PAUSE: 'pause',
		RESUME: 'resume',
		QUESTIONS: 'questions',
		LANGUAGE: 'language',
		START: 'start',
		INIT: 'init'
	}
};

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.LoLv2 = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.LoLv2.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;
	var self;
	var langData = {
		lang : {} //Storage for the language json file.
	};
	var rawQuestions;
	var currentQuestion;
	var currentQuestionIndex;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;

		this.rawQuestions = [];
		this.rawQuestions.push(dummyQuestion);

		this.currentQuestionIndex = 0;
		this.currentQuestion = dummyQuestion;

		self = this;

		//alert('This works');
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
		window.addEventListener("message", function (msg) {
			// Message name and JSONified payload
			console.log('Received message: ', msg);

			const { messageName, payload } = msg.data;

			switch (messageName) {
				case EVENT.RECEIVED.LANGUAGE:
					langData.lang = JSON.parse(payload);
					self.runtime.trigger(cr.plugins_.LoLv2.prototype.cnds.OnLanguage, self);
					break;
				case EVENT.RECEIVED.QUESTIONS:
					const tq = JSON.parse(payload);
					propagateQuestions(tq.questions);
					self.runtime.trigger(cr.plugins_.LoLv2.prototype.cnds.OnQuestions, self);
					break;
				case EVENT.RECEIVED.PAUSE:
					self.runtime.trigger(cr.plugins_.LoLv2.prototype.cnds.OnPause, self);
					break;
				case EVENT.RECEIVED.RESUME:
					self.runtime.trigger(cr.plugins_.LoLv2.prototype.cnds.OnResume, self);
					break;
				default:
					console.log('Unknown message: ' + msg);
			}
		});

		// any other properties you need, e.g...
		// this.myValue = 0;
	};

	//from lol v1 api
	function splitStems(questions) {
		for (var ctr=0; ctr<questions.length; ctr++) {
			const question = questions[ctr];

			const pattern = /([^\[\]]*)?(\[\S*\])?([^\[\]]*)?/;
    	const matches = pattern.exec(question.stem);

			question.before = (matches[1]) ? matches[1] : "";
			question.after = (matches[3]) ? matches[3] : "";
		}
	}

	function propagateQuestions(rawQuestions) {
    self.rawQuestions = rawQuestions;
		splitStems(rawQuestions);
		//Come on browser, get the new version bro.
    //convertQuestionsToBBCode(rawQuestions);

    if (rawQuestions.length === 0) {
      rawQuestions.push(dummyQuestion);
    }
		self.currentQuestionIndex = 0;
		self.currentQuestion = rawQuestions[0];
		//self.runtime.trigger(cr.plugins_.LoLQuestions.prototype.cnds.OnQuestions, self);
	}

	function LoLApi (messageName, payloadObj) {
		parent.postMessage({
			message: messageName,
			payload: JSON.stringify(payloadObj)
		},
		'*');

	}

	var instanceProto = pluginProto.Instance.prototype;

//	var self;


	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
	};

	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};

	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};

	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};

	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};

	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};

	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property

				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};

	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
	Cnds.prototype.MyCondition = function (myparam)
	{
		// return true if number is positive
		return myparam >= 0;
	};

	// ... other conditions here ...

	Cnds.prototype.OnLanguage = function ()
	{
		//I don't think this needs to do anything
		return true;
	};

	Cnds.prototype.OnQuestions = function ()
	{
		//I don't think this needs to do anything
		return true;
	};

	Cnds.prototype.OnPause = function ()
	{
		return true;
	};

	Cnds.prototype.OnResume = function ()
	{
		return true;
	};




	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.LoadProgress = function (prog)
	{
		LoLApi('loadingProgress', { progress: prog });
	};

	Acts.prototype.CompleteGame = function ()
	{
		LoLApi('complete', {});
	};
	Acts.prototype.SubmitProgress = function (prog,mprog,score)
	{
		LoLApi('progress', {currentProgress : prog, maximumProgress : mprog, score : score });
	};



	Acts.prototype.GetLanguageValue = function (ret,key) {
		ret.set_string(langData.lang[key])
	};

	// ... other actions here ...

	//Copied from LoL v1 API
  Acts.prototype.SubmitAnswer = function (alternativeId)
  {
	LoLApi('answer', { questionId: this.currentQuestion.questionId, alternativeId: alternativeId });

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.rawQuestions.length) {
      this.currentQuestionIndex = 0;
    }
		this.currentQuestion = this.rawQuestions[this.currentQuestionIndex];
  };
		//end of copied from lol v1 api

	Acts.prototype.SpeakText = function (key) {
		LoLApi('speakText', { key: key });
	};

	Acts.prototype.PlaySound = function (filename,looping,background) {
		LoLApi('playSound', { file: filename,looping: looping,backround: background});
	};

	Acts.prototype.StopSound = function (filename) {
		LoLApi('stopSound', { file: filename});
	};

	Acts.prototype.ConfigureSound = function (foreground,background,fade) {
		LoLApi('configureSound', { foreground: 0.6, background: 0.5, fade: 0.2 });
	};

	Acts.prototype.SpeakQuestion = function (questionId) {
		LoLApi('speakQuestion', { questionId: questionId });
	};

	Acts.prototype.SpeakAnswers = function (alternativeId) {
		LoLApi('speakAlternative', { alternativeId: alternativeId });
	};

	Acts.prototype.SpeakQuestionAndAnswers = function (questionId) {
		LoLApi('speakQuestionAndAlternatives', { questionId: questionId });
	};

	Acts.prototype.GameIsReady = function (aspectRatio = "16:9",resolution = "1024x576") {
		LoLApi('gameIsReady', {
			aspectRatio: aspectRatio,
			resolution: resolution
		});
	};



	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	// the example expression

	Exps.prototype.GetLanguageValue = function (ret,key) {
		//Alert(key+' with '+ langData.lang[key]);
		ret.set_string(""+langData.lang[key]);
	};
	// ... other expressions here ...

	//Copied from the v1 api
	Exps.prototype.RawQuestions = function (ret)
	{
		ret.set_string(JSON.stringify(this.rawQuestions));
	};

	Exps.prototype.QuestionID = function (ret)
	{
		ret.set_string(""+this.currentQuestion.questionId);
	};

	Exps.prototype.Stem = function (ret)
	{
		ret.set_string(this.currentQuestion.stem);
	};

	Exps.prototype.StemBeforeImage = function (ret)
	{
    const expValue =
      (this.currentQuestion && this.currentQuestion.before)
      ? this.currentQuestion.before : "";

    ret.set_string(expValue);
	};

	Exps.prototype.StemAfterImage = function (ret)
	{
    const expValue =
      (this.currentQuestion && this.currentQuestion.after)
      ? this.currentQuestion.after : "";

    ret.set_string(expValue);
	};

	Exps.prototype.ImageURL = function (ret)
	{
    const expValue =
      (this.currentQuestion && this.currentQuestion.imageURL)
      ? this.currentQuestion.imageURL : "";

    ret.set_string(expValue);
	};

	Exps.prototype.Alternative1ID = function (ret)
	{
		ret.set_string(""+this.currentQuestion.alternatives[0].alternativeId);
	};

	Exps.prototype.Alternative1Text = function (ret)
	{
		ret.set_string(this.currentQuestion.alternatives[0].text);
	};

	Exps.prototype.Alternative2ID = function (ret)
	{
		ret.set_string(""+this.currentQuestion.alternatives[1].alternativeId);
	};

	Exps.prototype.Alternative2Text = function (ret)
	{
		ret.set_string(this.currentQuestion.alternatives[1].text);
	};

	Exps.prototype.Alternative3ID = function (ret)
	{
		ret.set_string(""+this.currentQuestion.alternatives[2].alternativeId);
	};

	Exps.prototype.Alternative3Text = function (ret)
	{
		ret.set_string(this.currentQuestion.alternatives[2].text);
	};

	Exps.prototype.Alternative4ID = function (ret)
	{
		ret.set_string(""+this.currentQuestion.alternatives[3].alternativeId);
	};

	Exps.prototype.Alternative4Text = function (ret)
	{
		ret.set_string(this.currentQuestion.alternatives[3].text);
	};

  Exps.prototype.CorrectAlternativeID = function (ret)
	{
		ret.set_string(""+this.currentQuestion.correctAlternativeId);
	};
		//end of copied from v1 api

	pluginProto.exps = new Exps();

}());
