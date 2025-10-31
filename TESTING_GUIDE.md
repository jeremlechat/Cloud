# Guide pour compléter les tests

## Structure des tests déjà fournis

### Tests CPU (exemples complets) ✅
```typescript
describe('GET /api/v1/sysinfo - CPU Information', () => {
  it('should return CPU information with correct structure', async () => {
    const mockCpuData: Partial<si.Systeminformation.CpuData> = {
      manufacturer: 'Intel',
      brand: 'Core i7',
      cores: 4,
      speedMax: 4.0,
    };
    // Mock + Request + Assertions
  });
});
```

## Propriétés à tester pour chaque type

### System (SystemData)
Propriétés importantes :
- `manufacturer` : Fabricant du système (ex: "Dell", "HP", "Lenovo")
- `model` : Modèle (ex: "XPS 15", "ThinkPad")
- `version` : Version du modèle
- `serial` : Numéro de série
- `uuid` : UUID du système
- `sku` : SKU

### Memory (MemData)
Propriétés importantes :
- `total` : Mémoire totale en bytes
- `free` : Mémoire libre en bytes
- `used` : Mémoire utilisée en bytes
- `active` : Mémoire active
- `available` : Mémoire disponible
- `swaptotal` : Swap total
- `swapused` : Swap utilisé
- `swapfree` : Swap libre

## Exemples de tests à ajouter

### Pour System :
```typescript
it('should verify system has manufacturer property', async () => {
  const mockSystemData = {
    manufacturer: 'Lenovo',
    model: 'ThinkPad X1',
  };
  // ... mock autres fonctions
  const response = await request(app).get('/api/v1/sysinfo');
  expect(response.body.system.manufacturer).toBe('Lenovo');
});

it('should verify system has model property', async () => {
  // À vous de le compléter !
});
```

### Pour Memory :
```typescript
it('should verify memory has total property', async () => {
  const mockMemData = {
    total: 16000000000, // 16 GB
    free: 8000000000,   // 8 GB
    used: 8000000000,   // 8 GB
  };
  // ... mock autres fonctions
  const response = await request(app).get('/api/v1/sysinfo');
  expect(response.body.mem.total).toBe(16000000000);
});

it('should verify memory calculations are correct', async () => {
  const mockMemData = {
    total: 16000000000,
    free: 6000000000,
    used: 10000000000,
  };
  // ... mock autres fonctions
  const response = await request(app).get('/api/v1/sysinfo');
  expect(response.body.mem.used + response.body.mem.free).toBeLessThanOrEqual(response.body.mem.total);
});
```

## Exercice : Complétez le fichier server.spec.ts

1. Dans la section "System Information" :
   - Ajoutez 2-3 tests pour vérifier les propriétés (manufacturer, model, version)
   - Testez la structure complète de l'objet system

2. Dans la section "Memory Information" :
   - Ajoutez 2-3 tests pour vérifier les propriétés (total, free, used)
   - Testez que les valeurs sont numériques et cohérentes
   - Testez que free + used <= total

3. Bonus :
   - Ajoutez des tests pour vérifier que les types sont corrects
   - Testez les cas limites (mémoire = 0, etc.)
