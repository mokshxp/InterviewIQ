const axios = require('axios');
axios.post('https://integrate.api.nvidia.com/v1/chat/completions', {
    model: 'deepseek-ai/deepseek-r1',
    messages: [{ role: 'user', content: 'Hi' }],
    max_tokens: 100
}, {
    headers: { Authorization: 'Bearer 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' }
}).then(r => console.log('OK-DS', r.data.id)).catch(e => console.log('ERR-DS', e.response?.data || e.message));
