const createQueue = require('createQueue');
const dataLayerPush = createQueue('dataLayer');
const makeTableMap = require('makeTableMap');
const copyFromDataLayer = require('copyFromDataLayer');
const getUrl = require('getUrl');

const merge = function() {
  const obj = {},il = arguments.length;
    let i = 0,key;
    for (; i < il; i++) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };

let fb_eventName,ga4_eventName,gads_eventName,ttk_eventName,in_eventName;

/* Facebook Pixel */
if ( data.fb_pixelEventType === 'No Event' ) { fb_eventName = '0'; }
else{ fb_eventName = fb_eventName || (data.fb_pixelEventType === 'Custom' ? data.fb_ctmEventName : data.fb_stdEventName); }

/* Google Analytics 4 */
if ( data.ga4_pixelEventType === 'No Event' ) { ga4_eventName = '0'; }
else{ ga4_eventName = ga4_eventName || (data.ga4_pixelEventType === 'Custom' ? data.ga4_ctmEventName : data.ga4_stdEventName); }
 
/* Google AdWords */
if ( data.gads_pixelEventType === 'No Event' ) { gads_eventName = '0'; }
else{ gads_eventName = gads_eventName || (data.gads_pixelEventType === 'Conversion Label' ? data.gads_ctmEventName : '0'); }

/* Tiktok Pixel */
if ( data.ttk_pixelEventType === 'No Event' ) { ttk_eventName = '0'; }
else{ ttk_eventName = ttk_eventName || (data.ttk_pixelEventType === 'Custom' ? data.ttk_ctmEventName : data.ttk_stdEventName); }

/* Linkedin Insight Tag */
if ( data.in_pixelEventType === 'No Event' ) { in_eventName = '0'; }
else{ in_eventName = in_eventName || (data.in_pixelEventType === 'Conversion Label' ? data.in_ctmEventName : '0'); }

const ctxTK = copyFromDataLayer('ctx.TK');
const cli_GTMevent = copyFromDataLayer('ctx.cli_GTMevent');

var eventMapping = 
[
  {'varName': 'fb_pixelEvent'         , 'varValue': fb_eventName},
  {'varName': 'ga4_pixelEvent'        , 'varValue': ga4_eventName},
  {'varName': 'gads_conversionLabel'  , 'varValue': gads_eventName},
  {'varName': 'ttk_pixelEvent'        , 'varValue': ttk_eventName},
  {'varName': 'ctxTK'                 , 'varValue': ctxTK}
];

const cli_eventName =  {'event' :  cli_GTMevent };

const varSet = makeTableMap(eventMapping, 'varName', 'varValue');
const DLayer = merge(cli_eventName, varSet);

dataLayerPush(DLayer);
data.gtmOnSuccess();