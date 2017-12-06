function GetPluginSettings()
{
	return {
		"name":			"LoLQuestions",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"LoLQuestions",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.1",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Allows your game to get questions from the LoL platform. Release 1.1 adds support for very basic HTML markup by converting it to bbcode.",
		"author":		"legendsoflearning.com",
		"help url":		"docs.legendsoflearning.com",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		pf_singleglobal
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
AddCondition(0, cf_trigger, "On questions", "Questions", "On questions", "On questions received.", "OnQuestions");


////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

AddStringParam("QuestionID", "The unique id of the current question.");
AddStringParam("AlternativeID", "The unique id of the selected alternative.");
AddAction(0, af_none, "SubmitAnswer", "Questions", "SubmitAnswer {0}, {1}", "Send an init message to the LoL platform", "SubmitAnswer");


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
AddExpression(0, ef_return_string, "RawQuestions", "Questions", "RawQuestions", "Return the serialized questions.");
AddExpression(1, ef_return_string, "QuestionID", "Questions", "QuestionID", "Return the ID of the current question.");
AddExpression(2, ef_return_string, "Stem", "Questions", "Stem", "Return the entire raw stem of the current question.");
AddExpression(3, ef_return_string, "StemBeforeImage", "Questions", "StemBeforeImage", "Return the first part of the stem of the current question.");
AddExpression(4, ef_return_string, "StemAfterImage", "Questions", "StemAfterImage", "Return the second part of the stem of the current question.");
AddExpression(5, ef_return_string, "ImageURL", "Questions", "ImageURL", "Return the image URL.");

AddExpression(6, ef_return_string, "Alternative1ID", "Questions", "Alternative1ID", "Return the id of the 1st alternative.");
AddExpression(7, ef_return_string, "Alternative1Text", "Questions", "Alternative1Text", "Return the text of the 1st alternative.");

AddExpression(8, ef_return_string, "Alternative2ID", "Questions", "Alternative2ID", "Return the id of the 2nd alternative.");
AddExpression(9, ef_return_string, "Alternative2Text", "Questions", "Alternative2Text", "Return the text of the 2nd alternative.");

AddExpression(10, ef_return_string, "Alternative3ID", "Questions", "Alternative3ID", "Return the id of the 3rd alternative.");
AddExpression(11, ef_return_string, "Alternative3Text", "Questions", "Alternative3Text", "Return the text of the 3rd alternative.");

AddExpression(12, ef_return_string, "Alternative4ID", "Questions", "Alternative4ID", "Return the id of the 4th alternative.");
AddExpression(13, ef_return_string, "Alternative4Text", "Questions", "Alternative4Text", "Return the text of the 4th alternative.");

AddExpression(14, ef_return_string, "CorrectAlternativeID", "Questions", "CorrectAlternativeID", "Return the id of thecorrect alternative.");


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
	new cr.Property(ept_integer, 	"My property",		77,		"An example property.")
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
