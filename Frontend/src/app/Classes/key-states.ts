import { keyMap, keySet, keyState } from '../enums/config';

export class KeyStates {
  keys: keySet;
  constructor() {
    this.keys = {
      numbers: this.initializeKeys(keyMap.numRow),
      topRow: this.initializeKeys(keyMap.topRow),
      middleRow: this.initializeKeys(keyMap.middleRow),
      bottomRow: this.initializeKeys(keyMap.bottomRow),
    };
  }
  resetAllKeys() {
    Object.values(this.keys).forEach((row) => {
      row.forEach((key: keyState) => {
        key.enabled = true;
      });
    });
  }
  disableKey(key: string) {
    for (const row of Object.values(this.keys)) {
      const foundKey = row.find((k: keyState) => k.key === key);
      if (foundKey) {
        foundKey.enabled = false;
        break;
      }
    }
  }

  private initializeKeys(keyArray: string[]): keyState[] {
    return keyArray.map((key) => ({ key, enabled: true }));
  }
}
