import express, { Request, Response } from 'express';
import * as si from 'systeminformation';

// Define the system information interface
export interface ISystemInformation {
  cpu: si.Systeminformation.CpuData;
  system: si.Systeminformation.SystemData;
  mem: si.Systeminformation.MemData;
  os: si.Systeminformation.OsData;
  currentLoad: si.Systeminformation.CurrentLoadData;
  processes: si.Systeminformation.ProcessesData;
  diskLayout: si.Systeminformation.DiskLayoutData[];
  networkInterfaces:
    | si.Systeminformation.NetworkInterfacesData
    | si.Systeminformation.NetworkInterfacesData[];
}

// Create Express app
const app = express();
const PORT = parseInt(process.env.PORT || '8000', 10);

// Middleware to parse JSON
app.use(express.json());

// Route to get system information
app.get('/api/v1/sysinfo', async (req: Request, res: Response) => {
  try {
    // Gather all system information in parallel
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

    // Create response object matching the interface
    const systemInfo: ISystemInformation = {
      cpu,
      system,
      mem,
      os,
      currentLoad,
      processes,
      diskLayout,
      networkInterfaces,
    };

    // Send JSON response
    res.json(systemInfo);
  } catch (error) {
    console.error('Error fetching system information:', error);
    res.status(500).json({
      error: 'Failed to retrieve system information',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint - provide a small welcome / redirect info
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the system information API',
    health: '/health',
    sysinfo: '/api/v1/sysinfo',
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  console.log(`System info available at http://0.0.0.0:${PORT}/api/v1/sysinfo`);
  console.log(`Accessible from any network interface on port ${PORT}`);
});

export default app;
