const OPEN_AI_MODELS = {
  'gpt-4': {
    prompt: 0.03 / 1000,
    completion: 0.06 / 1000,
    maxTokens: 8192,
  },
  'gpt-4-32k': {
    prompt: 0.06 / 1000,
    completion: 0.12 / 1000,
    maxTokens: 32768,
  },
  'gpt-3.5-turbo': {
    prompt: 0.002 / 1000,
    completion: 0.002 / 1000,
    maxTokens: 4096,
  },
  'text-davinci-003': {
    prompt: 0.02 / 1000,
    completion: 0.02 / 1000,
    maxTokens: 4097,
  },
  'text-davinci-002': {
    prompt: 0.02 / 1000,
    completion: 0.02 / 1000,
    maxTokens: 4097,
  },
  davinci: {
    prompt: 0.02 / 1000,
    completion: 0.02 / 1000,
    maxTokens: 2049,
  },
  curie: {
    prompt: 0.0002 / 1000,
    completion: 0.0002 / 1000,
    maxTokens: 2049,
  },
  babbage: {
    prompt: 0.0005 / 1000,
    completion: 0.0005 / 1000,
    maxTokens: 2049,
  },
  ada: {
    prompt: 0.0004 / 1000,
    completion: 0.0004 / 1000,
    maxTokens: 2049,
  },
}

export default OPEN_AI_MODELS