const { CallbackData } = require("telegraf-callback-data");

const framesCD = new CallbackData("frames", ["type"]);

// Next list shows different buttons that culd used on Telegram
// Every button has diferents blocks for the logic:

// Internal name to relation Action and Name
const CALLBACK_TYPE_START   = "start";   // Send the user to start message
const CALLBACK_TYPE_GUESS   = "guess";   // Start the find to the takeoff
const CALLBACK_TYPE_BEFORE  = "before";  // The takeoff is before the current frame
const CALLBACK_TYPE_SELECT  = "this";    // The takeoff is in the current frame
const CALLBACK_TYPE_AFTER   = "after";   // The takeoff is after the current frame
const CALLBACK_TYPE_EXIT    = "exit";    // Exists the current search
const CALLBACK_TYPE_RESTART = "restart"; // Restart the finding (useful is the user click on bad button)

// Action name, used to receive events from buttons and run functions
const CALLBACK_TYPE_START_NAME   = framesCD.filter({ type: CALLBACK_TYPE_START   });
const CALLBACK_TYPE_GUESS_NAME   = framesCD.filter({ type: CALLBACK_TYPE_GUESS   });
const CALLBACK_TYPE_BEFORE_NAME  = framesCD.filter({ type: CALLBACK_TYPE_BEFORE  });
const CALLBACK_TYPE_SELECT_NAME  = framesCD.filter({ type: CALLBACK_TYPE_SELECT  });
const CALLBACK_TYPE_AFTER_NAME   = framesCD.filter({ type: CALLBACK_TYPE_AFTER   });
const CALLBACK_TYPE_EXIT_NAME    = framesCD.filter({ type: CALLBACK_TYPE_EXIT    });
const CALLBACK_TYPE_RESTART_NAME = framesCD.filter({ type: CALLBACK_TYPE_RESTART });

// Action refence, used to bind a button to a Action name
const CALLBACK_TYPE_START_ACTION   = framesCD.new({ type: CALLBACK_TYPE_START   });
const CALLBACK_TYPE_GUESS_ACTION   = framesCD.new({ type: CALLBACK_TYPE_GUESS   });
const CALLBACK_TYPE_BEFORE_ACTION  = framesCD.new({ type: CALLBACK_TYPE_BEFORE  });
const CALLBACK_TYPE_SELECT_ACTION  = framesCD.new({ type: CALLBACK_TYPE_SELECT  });
const CALLBACK_TYPE_AFTER_ACTION   = framesCD.new({ type: CALLBACK_TYPE_AFTER   });
const CALLBACK_TYPE_EXIT_ACTION    = framesCD.new({ type: CALLBACK_TYPE_EXIT    });
const CALLBACK_TYPE_RESTART_ACTION = framesCD.new({ type: CALLBACK_TYPE_RESTART });


exports.CALLBACK_TYPE_START_NAME   = CALLBACK_TYPE_START_NAME;
exports.CALLBACK_TYPE_GUESS_NAME   = CALLBACK_TYPE_GUESS_NAME;
exports.CALLBACK_TYPE_BEFORE_NAME  = CALLBACK_TYPE_BEFORE_NAME;
exports.CALLBACK_TYPE_SELECT_NAME  = CALLBACK_TYPE_SELECT_NAME;
exports.CALLBACK_TYPE_AFTER_NAME   = CALLBACK_TYPE_AFTER_NAME;
exports.CALLBACK_TYPE_EXIT_NAME    = CALLBACK_TYPE_EXIT_NAME;
exports.CALLBACK_TYPE_RESTART_NAME = CALLBACK_TYPE_RESTART_NAME;

exports.CALLBACK_TYPE_START_ACTION   = CALLBACK_TYPE_START_ACTION;
exports.CALLBACK_TYPE_GUESS_ACTION   = CALLBACK_TYPE_GUESS_ACTION;
exports.CALLBACK_TYPE_BEFORE_ACTION  = CALLBACK_TYPE_BEFORE_ACTION;
exports.CALLBACK_TYPE_SELECT_ACTION  = CALLBACK_TYPE_SELECT_ACTION;
exports.CALLBACK_TYPE_AFTER_ACTION   = CALLBACK_TYPE_AFTER_ACTION;
exports.CALLBACK_TYPE_EXIT_ACTION    = CALLBACK_TYPE_EXIT_ACTION;
exports.CALLBACK_TYPE_RESTART_ACTION = CALLBACK_TYPE_RESTART_ACTION;
