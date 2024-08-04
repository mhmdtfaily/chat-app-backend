
const map: Map<string, Function> = new Map();
const pattern_map: Map<string, Function> = new Map();

map.set('GET-/health_check', (params: any, body: any): string[] => {
  const errors: string[] = [];
  return errors;
});

export const validator = (url_index: string, params: any, body: any): string[] => {
  const func = map.get(url_index);
  if (func) return func(params, body);
  else {
    const pattern_func = patternMap(url_index);
    if (pattern_func) return pattern_func(params, body);
    else return [];
  }
};

// validate key in pattern map array
function patternMap(key: string): Function | undefined {
  for (const [pattern, fn] of pattern_map.entries()) {
    if (key.match(pattern)) {
      return fn;
    }
  }
  return undefined;
}