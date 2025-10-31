import request from 'supertest';
import express from 'express';
import * as si from 'systeminformation';

// Mock the systeminformation module
jest.mock('systeminformation');

describe('Server API Tests', () => {
  let app: express.Application;

  beforeAll(() => {
    // Create a test version of the app without starting the server
    app = express();
    app.use(express.json());

    // Copy the route from server.ts
    app.get('/api/v1/sysinfo', async (req, res) => {
      try {
        const [cpu, system, mem, os, currentLoad, processes, diskLayout, networkInterfaces] =
          await Promise.all([
            si.cpu(),
            si.system(),
            si.mem(),
            si.osInfo(),
            si.currentLoad(),
            si.processes(),
            si.diskLayout(),
            si.networkInterfaces(),
          ]);

        const systemInfo = {
          cpu,
          system,
          mem,
          os,
          currentLoad,
          processes,
          diskLayout,
          networkInterfaces,
        };

        res.json(systemInfo);
      } catch (error) {
        res.status(500).json({
          error: 'Failed to retrieve system information',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/v1/sysinfo - CPU Information', () => {
    it('should return CPU information with correct structure', async () => {
      // Mock data pour le CPU
      const mockCpuData: Partial<si.Systeminformation.CpuData> = {
        manufacturer: 'Intel',
        brand: 'Core i7',
        vendor: 'Intel',
        family: '6',
        model: '142',
        stepping: '10',
        revision: '',
        voltage: '1.2',
        speed: 2.8,
        speedMin: 0.8,
        speedMax: 4.0,
        cores: 4,
        physicalCores: 4,
        processors: 1,
      };

      // Mock toutes les fonctions systeminformation
      (si.cpu as jest.Mock).mockResolvedValue(mockCpuData);
      (si.system as jest.Mock).mockResolvedValue({});
      (si.mem as jest.Mock).mockResolvedValue({});
      (si.osInfo as jest.Mock).mockResolvedValue({});
      (si.currentLoad as jest.Mock).mockResolvedValue({});
      (si.processes as jest.Mock).mockResolvedValue({});
      (si.diskLayout as jest.Mock).mockResolvedValue([]);
      (si.networkInterfaces as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/api/v1/sysinfo');

      // Vérifications
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('cpu');
      expect(response.body.cpu).toEqual(mockCpuData);
    });

    it('should verify CPU has manufacturer property', async () => {
      const mockCpuData: Partial<si.Systeminformation.CpuData> = {
        manufacturer: 'AMD',
        brand: 'Ryzen 7',
        cores: 16,
        speedMax: 4.5,
      };

      (si.cpu as jest.Mock).mockResolvedValue(mockCpuData);
      (si.system as jest.Mock).mockResolvedValue({});
      (si.mem as jest.Mock).mockResolvedValue({});
      (si.osInfo as jest.Mock).mockResolvedValue({});
      (si.currentLoad as jest.Mock).mockResolvedValue({});
      (si.processes as jest.Mock).mockResolvedValue({});
      (si.diskLayout as jest.Mock).mockResolvedValue([]);
      (si.networkInterfaces as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/api/v1/sysinfo');

      expect(response.body.cpu).toHaveProperty('manufacturer');
      expect(response.body.cpu.manufacturer).toBe('AMD');
    });

    it('should verify CPU has cores information', async () => {
      const mockCpuData: Partial<si.Systeminformation.CpuData> = {
        manufacturer: 'Intel',
        brand: 'Core i9',
        cores: 16,
        physicalCores: 8,
        processors: 1,
      };

      (si.cpu as jest.Mock).mockResolvedValue(mockCpuData);
      (si.system as jest.Mock).mockResolvedValue({});
      (si.mem as jest.Mock).mockResolvedValue({});
      (si.osInfo as jest.Mock).mockResolvedValue({});
      (si.currentLoad as jest.Mock).mockResolvedValue({});
      (si.processes as jest.Mock).mockResolvedValue({});
      (si.diskLayout as jest.Mock).mockResolvedValue([]);
      (si.networkInterfaces as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/api/v1/sysinfo');

      expect(response.body.cpu).toHaveProperty('cores');
      expect(response.body.cpu.cores).toBe(16);
      expect(response.body.cpu).toHaveProperty('physicalCores');
      expect(response.body.cpu.physicalCores).toBe(8);
    });
  });

  // TODO: Ajoutez vos tests pour le système ici
  describe('GET /api/v1/sysinfo - System Information', () => {
    it('should return system information with correct structure', async () => {
      // À COMPLÉTER : Créez un mockSystemData similaire au mockCpuData
      const mockSystemData: Partial<si.Systeminformation.SystemData> = {
        manufacturer: 'Dell',
        model: 'XPS 15',
        version: '9520',
        // Ajoutez d'autres propriétés...
      };

      (si.cpu as jest.Mock).mockResolvedValue({});
      (si.system as jest.Mock).mockResolvedValue(mockSystemData);
      (si.mem as jest.Mock).mockResolvedValue({});
      (si.osInfo as jest.Mock).mockResolvedValue({});
      (si.currentLoad as jest.Mock).mockResolvedValue({});
      (si.processes as jest.Mock).mockResolvedValue({});
      (si.diskLayout as jest.Mock).mockResolvedValue([]);
      (si.networkInterfaces as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/api/v1/sysinfo');

      // À COMPLÉTER : Ajoutez vos vérifications
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('system');
      // Ajoutez plus de tests...
    });

    // TODO: Ajoutez plus de tests pour system (manufacturer, model, etc.)
  });

  // TODO: Ajoutez vos tests pour la mémoire ici
  describe('GET /api/v1/sysinfo - Memory Information', () => {
    it('should return memory information with correct structure', async () => {
      // À COMPLÉTER : Créez un mockMemData
      const mockMemData: Partial<si.Systeminformation.MemData> = {
        total: 16000000000,
        free: 8000000000,
        used: 8000000000,
        // Ajoutez d'autres propriétés...
      };

      (si.cpu as jest.Mock).mockResolvedValue({});
      (si.system as jest.Mock).mockResolvedValue({});
      (si.mem as jest.Mock).mockResolvedValue(mockMemData);
      (si.osInfo as jest.Mock).mockResolvedValue({});
      (si.currentLoad as jest.Mock).mockResolvedValue({});
      (si.processes as jest.Mock).mockResolvedValue({});
      (si.diskLayout as jest.Mock).mockResolvedValue([]);
      (si.networkInterfaces as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/api/v1/sysinfo');

      // À COMPLÉTER : Ajoutez vos vérifications
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('mem');
      // Ajoutez plus de tests...
    });

    // TODO: Ajoutez plus de tests pour mem (total, free, used, etc.)
  });

  describe('Error Handling', () => {
    it('should return 500 if systeminformation throws an error', async () => {
      (si.cpu as jest.Mock).mockRejectedValue(new Error('CPU info unavailable'));
      (si.system as jest.Mock).mockResolvedValue({});
      (si.mem as jest.Mock).mockResolvedValue({});
      (si.osInfo as jest.Mock).mockResolvedValue({});
      (si.currentLoad as jest.Mock).mockResolvedValue({});
      (si.processes as jest.Mock).mockResolvedValue({});
      (si.diskLayout as jest.Mock).mockResolvedValue([]);
      (si.networkInterfaces as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/api/v1/sysinfo');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Failed to retrieve system information');
    });
  });
});
