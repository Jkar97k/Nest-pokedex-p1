export class CreateTaskDto {
  email: string;
  username: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar_url?: string;
  birth_date?: Date;
  gender?: string;
  phone?: string;
  privacy?: boolean;
  receive_notifications?: boolean;

  // constructor(data: Partial<CreateTaskDto>) {
  //   // Campos obligatorios: mantenemos el fallback a string vacío para evitar errores
  //   this.email = data.email?.toLowerCase().trim() ?? '';
  //   this.username = data.username?.toLowerCase().trim() ?? '';
  //   this.password_hash = data.password_hash ?? '';

  //   // Campos opcionales: es mejor que sean undefined si no vienen, 
  //   // así Prisma guarda NULL en la DB y no un "" (string vacío).
  //   this.first_name = data.first_name?.toLowerCase().trim();
  //   this.last_name = data.last_name?.toLowerCase().trim();
  //   this.bio = data.bio?.trim();
  //   this.avatar_url = data.avatar_url?.trim();
  //   this.gender = data.gender?.toLowerCase().trim();
  //   this.phone = data.phone?.trim();

  //   // Manejo de booleanos (valores por defecto)
  //   this.privacy = data.privacy ?? false;
  //   this.receive_notifications = data.receive_notifications ?? true;

  //   // Validación de fecha
  //   if (data.birth_date) {
  //     const date = new Date(data.birth_date);
  //     // Validamos que la fecha sea real (que no sea "Invalid Date")
  //     this.birth_date = isNaN(date.getTime()) ? undefined : date;
  //   }
  // }
}