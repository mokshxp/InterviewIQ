const axios = require('axios');
axios.post('https://integrate.api.nvidia.com/v1/chat/completions', {
  model: 'qwen/qwen2.5-72b-instruct',
  messages: [{role:'user', content:'Hi'}]
}, {
  headers: { Authorization: 'Bearer ' + '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' }
}).then(r => console.log('OK2.5-72b', r.data.id)).catch(e => console.log('ERR2.5-72b', e.response?.data || e.message));
