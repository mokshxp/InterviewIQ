const axios = require('axios');
axios.post('https://integrate.api.nvidia.com/v1/chat/completions', {
    model: 'meta/llama-3.1-405b-instruct',
    messages: [{ role: 'user', content: 'Hi' }],
    chat_template_kwargs: { enable_thinking: true }
}, {
    headers: { Authorization: 'Bearer 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' }
}).then(r => console.log('OK-Llama', r.data.id)).catch(e => console.log('ERR-Llama', e.response?.data || e.message));
