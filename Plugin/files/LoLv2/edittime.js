function GetPluginSettings()
{
	return {
		"name":			"LoL v2 API",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"LoLv2",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Minimal implementation of required javascript features",
		"author":		"Dan Kavanaugh",
		"help url":		"http://www.dandeliongames.com",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	true,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0						// uncomment lines to enable flags...
						| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
//AddNumberParam("Number", "Enter a number to test if positive.");

//AddCondition(0, cf_none, "Is number positive", "My category", "{0} is positive", "Description for my condition!", "MyCondition");
//The langauge has been loaded.
AddCondition(0, cf_trigger, "Language Data Received", "Payloads", "On <b>Language</b>", "Language loaded from server, store it in a dictionary", "OnLanguage");
AddCondition(1, cf_trigger, "Questions Data Received", "Payloads", "On <b>Questions</b>.", "Questions have been received from the server.", "OnQuestions");
AddCondition(2, cf_trigger, "Game Paused", "General", "On <b>Pause</b>.", "LOL Platfrom has requested pause.", "OnPause");
AddCondition(3, cf_trigger, "Game Resumed", "General", "On <b>Resume</b>.", "LOL Platform has requested resume.", "OnResume");


////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
//AddStringParam("Message", "Enter a string to alert.");
//AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");
//AddAction(0, af_none, "Init", "Lifecycle", "Call immediately", "Calls the start function!", "Start");
//AddAction(0, af_none, "Init", "Lifecycle", "Init life cycle of LoL Platform", "Calls gameIsReady", "InitLOL");
//AddStringParam("Payload", "A payload to be sent in JSON format.","{\"languageCode\":\"en\"}");
//AddAction(1, af_none, "Start", "Lifecycle", "Start the game using {0} langauge", "Calls the start function!", "Start");
AddNumberParam("LoadProgress", "0.0 to 1.0");
AddAction(2, af_none, "Load Progress", "Lifecycle", "Load progress {0}.", "Value between 0.0 and 1.0. Let's LoL and users see how much progress has loaded", "LoadProgress");
AddAction(3, af_none, "Complete Game", "Lifecycle", "Game is complete", "LoL Platform will close the game and record stats", "CompleteGame");

AddNumberParam("Progress", "Progress, should only increase, and never exceed max progress.");
AddNumberParam("MaxProgress", "Max Progress.");
AddNumberParam("Score", "A score if you want.","0");
AddAction(4, af_none, "Progress", "General", "Submit progress {0} of {1}. Score: {2}", "LoL wants about 15 progress reports during game, minimum of 8.", "SubmitProgress");

//AddStringParam("QuestionID", "The 'question id' of the current question.");
AddStringParam("AnswerID", "The 'alternative id' user chose.");
AddAction(5, af_none, "Answer Question", "Questions", "Submit answer {0}", "Submit answer to the current question.", "SubmitAnswer");
AddStringParam("QuestionID", "The 'question id' of the question to speak.");
AddAction(6, af_none, "Speak Question", "Questions", "Speak Current Question", "Speak the current question.", "SpeakQuestion");
AddStringParam("AnswerID", "The 'alternative id' of the answer to speak.");
AddAction(7, af_none, "Speak Answers", "Questions", "Speak alternative text", "Speak the alternatives.", "SpeakAnswers");
AddStringParam("QuestionID", "The 'question id' of the question to speak.");
AddAction(8, af_none, "Speak Questions And Answers", "Questions", "Speak Current Question and Answers", "Speak answers and question (alternatives).", "SpeakQuestionAndAnswers");

AddStringParam("TextKey", "Enter the name key of a string to speak.");
AddAction(9, af_none, "SpeakText", "Speak", "Speak text key {0}", "Speak arbitrary text {0}.", "SpeakText");

AddStringParam("FileName", "Path and name of file to play.");
AddComboParamOption("False")
AddComboParamOption("True")
AddComboParam("Looping", "Looping the audio" ,0)
AddComboParamOption("True")
AddComboParamOption("False")
AddComboParam("Background", "Should fade when other audio plays" ,0)
AddAction(10, af_none, "Play Sound", "Audio", "Play the sound {0}", "Play sound {0}, looping {1} background {2}.", "PlaySound");
AddStringParam("FileName", "Sound to stop playing.");
AddAction(11, af_none, "Stop Sound", "Audio", "Stop sound {0} from playing", "Stop sound {0} from playing.", "StopSound");
AddNumberParam("Foreground", "Foreground volume","0.6");
AddNumberParam("Background", "Background volume","0.5");
AddNumberParam("Fade", "I don't know yet","0.2");
AddAction(12, af_none, "Configure Sound", "Audio", "Configure sound {0} volume", "Configure Sound{0} volume.", "ConfigureSound");

AddStringParam("Key", "Key of value.");
AddAction(13, ef_return_string, "Get value for key", "Language", "Get the value of {0} in language file", "Get the value of a key in the language file.", "GetLanguageValue");

//AddStringParam("QuestionID", "The unique id of the current question.");
AddStringParam("AlternativeID", "The unique id of the selected alternative.");
AddAction(14, af_none, "SubmitAnswer", "Questions", "SubmitAnswer {0}", "Send an answer to the LoL platform", "SubmitAnswer");

AddStringParam("Aspect Ratio", "Aspect ratio","\"16:9\"");
AddStringParam("Resolution", "Resolution","\"1024x574\"");
AddAction(15, ef_none, "Game is ready", "Lifecycle", "gameIsReady: {0}, {1}", "Tell LoL Platform the game is ready to receive messages.", "GameIsReady");


////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
//AddExpression(0, ef_return_number, "Leet expression", "My category", "MyExpression", "Return the number 1337.");
//AddExpression(0, ef_return_number, "Play Sound", "Audio", "PlaySound", "Return the ID of the sound.");
//AddStringParam("Key", "The key to get.");
AddStringParam("Key", "Key of value.");
AddExpression(1, ef_return_string, "GetLanguageValue(<b>{0}</b>)", "language", "GetLanguageValue", "Return the value of a particular langauge key.");


AddExpression(2, ef_return_string, "RawQuestions", "Questions", "RawQuestions", "Return the serialized questions.");
AddExpression(3, ef_return_string, "QuestionID", "Questions", "QuestionID", "Return the ID of the current question.");
AddExpression(4, ef_return_string, "Stem", "Questions", "Stem", "Return the entire raw stem of the current question.");
AddExpression(5, ef_return_string, "StemBeforeImage", "Questions", "StemBeforeImage", "Return the first part of the stem of the current question.");
AddExpression(6, ef_return_string, "StemAfterImage", "Questions", "StemAfterImage", "Return the second part of the stem of the current question.");
AddExpression(7, ef_return_string, "ImageURL", "Questions", "ImageURL", "Return the image URL.");

AddExpression(8, ef_return_string, "Alternative1ID", "Questions", "Alternative1ID", "Return the id of the 1st alternative.");
AddExpression(9, ef_return_string, "Alternative1Text", "Questions", "Alternative1Text", "Return the text of the 1st alternative.");

AddExpression(10, ef_return_string, "Alternative2ID", "Questions", "Alternative2ID", "Return the id of the 2nd alternative.");
AddExpression(11, ef_return_string, "Alternative2Text", "Questions", "Alternative2Text", "Return the text of the 2nd alternative.");

AddExpression(12, ef_return_string, "Alternative3ID", "Questions", "Alternative3ID", "Return the id of the 3rd alternative.");
AddExpression(13, ef_return_string, "Alternative3Text", "Questions", "Alternative3Text", "Return the text of the 3rd alternative.");

AddExpression(14, ef_return_string, "Alternative4ID", "Questions", "Alternative4ID", "Return the id of the 4th alternative.");
AddExpression(15, ef_return_string, "Alternative4Text", "Questions", "Alternative4Text", "Return the text of the 4th alternative.");

AddExpression(16, ef_return_string, "CorrectAlternativeID", "Questions", "CorrectAlternativeID", "Return the id of thecorrect alternative.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
	//new cr.Property(ept_integer, 	"My property",		77,		"An example property.")
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}