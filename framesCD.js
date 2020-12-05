const { CallbackData } = require('telegraf-callback-data');

const framesCD = new CallbackData('frames', ['type']);

const CALLBACK_TYPE_BEFORE = 'before';
const CALLBACK_TYPE_SELECT = 'this';
const CALLBACK_TYPE_AFTER  = 'after';
const CALLBACK_TYPE_EXIT   = 'exit';

const CALLBACK_TYPE_BEFORE_NAME = framesCD.filter({ type: CALLBACK_TYPE_BEFORE });
const CALLBACK_TYPE_SELECT_NAME = framesCD.filter({ type: CALLBACK_TYPE_SELECT });
const CALLBACK_TYPE_AFTER_NAME  = framesCD.filter({ type: CALLBACK_TYPE_AFTER  });
const CALLBACK_TYPE_EXIT_NAME   = framesCD.filter({ type: CALLBACK_TYPE_EXIT   });

const CALLBACK_TYPE_BEFORE_ACTION = framesCD.new({ type: CALLBACK_TYPE_BEFORE });
const CALLBACK_TYPE_SELECT_ACTION = framesCD.new({ type: CALLBACK_TYPE_SELECT });
const CALLBACK_TYPE_AFTER_ACTION  = framesCD.new({ type: CALLBACK_TYPE_AFTER  });
const CALLBACK_TYPE_EXIT_ACTION   = framesCD.new({ type: CALLBACK_TYPE_EXIT   });


exports.CALLBACK_TYPE_BEFORE_NAME = CALLBACK_TYPE_BEFORE_NAME;
exports.CALLBACK_TYPE_SELECT_NAME = CALLBACK_TYPE_SELECT_NAME;
exports.CALLBACK_TYPE_AFTER_NAME  = CALLBACK_TYPE_AFTER_NAME;
exports.CALLBACK_TYPE_EXIT_NAME   = CALLBACK_TYPE_EXIT_NAME;

exports.CALLBACK_TYPE_BEFORE_ACTION = CALLBACK_TYPE_BEFORE_ACTION;
exports.CALLBACK_TYPE_SELECT_ACTION = CALLBACK_TYPE_SELECT_ACTION;
exports.CALLBACK_TYPE_AFTER_ACTION  = CALLBACK_TYPE_AFTER_ACTION;
exports.CALLBACK_TYPE_EXIT_ACTION   = CALLBACK_TYPE_EXIT_ACTION;
