import { PrismaClient } from '@prisma/client';
import { Employee } from '@prisma/client';
import { deleteFile } from '../../utils/deleteFile';

const prisma = new PrismaClient();

interface CreateEmployeeInput {
  employeeImage?: string;
  name: string;
  rg: string;
  cpf: string;
  workCard: string;
  address: string;
  phone: string;
  email: string;
  hiringDate: Date;
  workingHours: object;
  salary: number;
  dayOff: object;
  vacation: object;
  uniformSize: string;
}

class EmployeeService {
  // Criar novo funcionário
  async createEmployee(data: CreateEmployeeInput): Promise<Employee> {
    try {
      const employee = await prisma.employee.create({
        data: {
          ...data,
        },
      });
      return employee;
    } catch (error) {
      throw new Error(`Error creating employee: ${error.message}`);
    }
  }

  // Listar todos os funcionários
  async listEmployees(): Promise<Employee[]> {
    try {
      return await prisma.employee.findMany();
    } catch (error) {
      throw new Error(`Error listing employees: ${error.message}`);
    }
  }

  // Editar funcionário
  async updateEmployee(id: string, data: Partial<CreateEmployeeInput>): Promise<Employee> {
    try {
      // Buscar funcionário atual
      const existingEmployee = await prisma.employee.findUnique({
        where: { id },
      });

      if (!existingEmployee) {
        throw new Error('Employee not found');
      }

      // Deletar imagem antiga, se necessário
      if (existingEmployee.employeeImage !== data.employeeImage) {
        deleteFile(existingEmployee.employeeImage.replace('/uploads/', ''));
      }

      // Atualizar funcionário
      return await prisma.employee.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Error updating employee: ${error.message}`);
    }
  }


  // Excluir funcionário
  async deleteEmployee(id: string): Promise<Employee> {
    try {
      return await prisma.employee.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error deleting employee: ${error.message}`);
    }
  }

  // Buscar funcionário por ID
  async getEmployeeById(id: string): Promise<Employee | null> {
    try {
      return await prisma.employee.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error fetching employee by ID: ${error.message}`);
    }
  }

}

export default new EmployeeService();
