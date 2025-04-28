import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, User, Sun, Mail, Phone } from "lucide-react";

const Clients = () => {
  // Mock data for clients
  const clients = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 555-123-4567",
      plants: 2,
      totalCapacity: "22 kW",
      status: "active",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "+1 555-987-6543",
      plants: 1,
      totalCapacity: "10 kW",
      status: "active",
    },
    {
      id: 3,
      name: "Robert Lee",
      email: "robert.lee@example.com",
      phone: "+1 555-456-7890",
      plants: 3,
      totalCapacity: "32 kW",
      status: "active",
    },
    {
      id: 4,
      name: "Emma Johnson",
      email: "emma.johnson@example.com",
      phone: "+1 555-789-0123",
      plants: 1,
      totalCapacity: "14 kW",
      status: "inactive",
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.wilson@example.com",
      phone: "+1 555-234-5678",
      plants: 2,
      totalCapacity: "18 kW",
      status: "active",
    },
    {
      id: 6,
      name: "Sofia Martinez",
      email: "sofia.martinez@example.com",
      phone: "+1 555-345-6789",
      plants: 2,
      totalCapacity: "24 kW",
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Clientes</h1>
        <Button className="mt-2 sm:mt-0">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Novo Cliente
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <User className="h-4 w-4 text-solar-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">
              {clients.filter(c => c.status === "active").length} clientes ativos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Usinas</CardTitle>
            <Sun className="h-4 w-4 text-solar-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.reduce((acc, client) => acc + client.plants, 0)}</div>
            <p className="text-xs text-muted-foreground">
              Gerenciadas para todos os clientes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
            <Sun className="h-4 w-4 text-solar-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120 kW</div>
            <p className="text-xs text-muted-foreground">
              Todas as instalações de clientes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Diretório de Clientes</CardTitle>
          <CardDescription>
            Gerencie seus clientes de energia solar
          </CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar clientes..." 
                className="pl-9"
                type="search"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
              <div className="col-span-2">Nome</div>
              <div className="hidden md:block">Contato</div>
              <div className="text-center">Usinas</div>
              <div className="hidden md:block">Capacidade</div>
              <div className="text-right">Ações</div>
            </div>
            {clients.map((client) => (
              <div key={client.id} className="grid grid-cols-6 items-center p-3 text-sm border-t">
                <div className="col-span-2">
                  <div className="font-medium">{client.name}</div>
                  <div className="text-muted-foreground text-xs md:hidden">{client.email}</div>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{client.phone}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{client.plants}</div>
                </div>
                <div className="hidden md:block">
                  <div className="font-medium">{client.totalCapacity}</div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">Ver</Button>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
