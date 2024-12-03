import { Request, Response } from 'express';
import EmployeeService from '../../services/Employee/EmployeeService';

class EmployeeController {
  // Criar novo funcionário
  async createEmployee(req: Request, res: Response): Promise<Response> {
    const {
      name,
      rg,
      cpf,
      workCard,
      address,
      phone,
      email,
      hiringDate,
      workingHours,
      salary,
      dayOff,
      vacation,
      uniformSize,
    } = req.body;

    const employeeImage = req.file?.filename ? `/uploads/${req.file.filename}` : null;

    try {
      const newEmployee = await EmployeeService.createEmployee({
        employeeImage,
        name,
        rg,
        cpf,
        workCard,
        address,
        phone,
        email,
        hiringDate: new Date(hiringDate),
        workingHours,
        salary: parseFloat(salary),
        dayOff,
        vacation,
        uniformSize,
      });

      return res.status(201).json(newEmployee);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Listar todos os funcionários
  async listEmployees(req: Request, res: Response): Promise<Response> {
    try {
      const employees = await EmployeeService.listEmployees();
      return res.status(200).json(employees);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Editar funcionário
  async updateEmployee(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name,
      rg,
      cpf,
      workCard,
      address,
      phone,
      email,
      hiringDate,
      workingHours,
      salary,
      dayOff,
      vacation,
      uniformSize,
    } = req.body;

    const employeeImage = req.file?.filename ? `/uploads/${req.file.filename}` : null;
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(id, {
        employeeImage,
        name,
        rg,
        cpf,
        workCard,
        address,
        phone,
        email,
        hiringDate: new Date(hiringDate),
        workingHours,
        salary: parseFloat(salary),
        dayOff,
        vacation,
        uniformSize,
      });

      return res.status(200).json(updatedEmployee);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Excluir funcionário
  async deleteEmployee(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const deletedEmployee = await EmployeeService.deleteEmployee(id);
      return res.status(200).json(deletedEmployee);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  // Buscar funcionário por ID
  async getEmployeeById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const employee = await EmployeeService.getEmployeeById(id);

      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      return res.status(200).json(employee);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

}

export default new EmployeeController();
