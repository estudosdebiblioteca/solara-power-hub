
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Users, User, Zap, FileText, Settings, PlusCircle, Eye, Edit } from "lucide-react";
import ClientView from "@/components/ClientView";
import ClientEdit from "@/components/ClientEdit";
import { toast } from "sonner";

const PlantManagement = () => {
  const { id } = useParams();
  const [viewingClient, setViewingClient] = useState<number | null>(null);
  const [editingClient, setEditingClient] = useState<number | null>(null);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "João Silva",
      units: 2,
      consumption: "850 kWh",
      saving: "R$ 520,00",
      share: 25,
      since: "Jan 2023",
    },
    {
      id: 2,
      name: "Maria Oliveira",
      units: 1,
      consumption: "320 kWh",
      saving: "R$ 210,00",
      share: 15,
      since: "Mar 2023",
    },
    {
      id: 3,
      name: "Carlos Santos",
      units: 3,
      consumption: "1200 kWh",
      saving: "R$ 780,00",
      share: 30,
      since: "Fev 2023",
    },
    {
      id: 4,
      name: "Ana Lima",
      units: 1,
      consumption: "280 kWh",
      saving: "R$ 180,00",
      share: 10,
      since: "Abr 2023",
    },
    {
      id: 5,
      name: "Roberto Pereira",
      units: 2,
      consumption: "720 kWh",
      saving: "R$ 450,00",
      share: 20,
      since: "Mai 2023",
    },
  ]);
  
  // Mock data para uma usina específica e seus clientes
  const plant = {
    id: parseInt(id as string),
    name: "Sunny Meadows",
    location: "Arizona",
    capacity: "1.2 MW",
    clients: 5,
    efficiency: 92,
  };

  // Dados simulados de estatísticas gerais
  const stats = {
    totalConsumption: "3370 kWh",
    totalSavings: "R$ 2.140,00",
    averageEfficiency: "94%",
    availableCapacity: "15%",
  };

  const handleViewClient = (clientId: number) => {
    setViewingClient(clientId);
  };

  const handleEditClient = (clientId: number) => {
    setEditingClient(clientId);
  };

  const handleSaveClientShare = (clientId: number, newShare: number) => {
    setClients(clients.map(client => {
      if (client.id === clientId) {
        return { ...client, share: newShare };
      }
      return client;
    }));
    toast.success(`Participação do cliente atualizada para ${newShare}%`);
  };

  const getClientById = (clientId: number) => {
    return clients.find(client => client.id === clientId) || clients[0];
  };

  return (
    <div className="space-y-6">
      {viewingClient !== null && (
        <ClientView 
          isOpen={viewingClient !== null}
          onClose={() => setViewingClient(null)}
          client={getClientById(viewingClient)}
        />
      )}
      
      {editingClient !== null && (
        <ClientEdit
          isOpen={editingClient !== null}
          onClose={() => setEditingClient(null)}
          client={getClientById(editingClient)}
          onSave={handleSaveClientShare}
        />
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/plants">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Usinas
            </Link>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link to={`/plants/${id}`}>
              <FileText className="mr-2 h-4 w-4" />
              Ver Detalhes
            </Link>
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configurações da Usina
          </Button>
        </div>
      </div>

      <h1 className="text-3xl font-bold">Gerenciamento: {plant.name}</h1>
      <p className="text-muted-foreground">
        Gerencie clientes e acompanhe o desempenho da usina solar
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Users className="mr-2 h-5 w-5 text-solar-blue" />
              {plant.clients}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Consumo Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Zap className="mr-2 h-5 w-5 text-solar-yellow" />
              {stats.totalConsumption}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Economia Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.totalSavings}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Disponível</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.availableCapacity}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Clientes Associados</CardTitle>
            <CardDescription>
              Lista de clientes atualmente vinculados a esta usina solar
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Cliente
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Unidades</TableHead>
                <TableHead>Consumo</TableHead>
                <TableHead>Economia</TableHead>
                <TableHead>Participação</TableHead>
                <TableHead>Cliente Desde</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-solar-blue/20 flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-solar-blue" />
                      </div>
                      {client.name}
                    </div>
                  </TableCell>
                  <TableCell>{client.units}</TableCell>
                  <TableCell>{client.consumption}</TableCell>
                  <TableCell className="text-green-600">{client.saving}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${client.share}%` }}></div>
                      </div>
                      {client.share}%
                    </div>
                  </TableCell>
                  <TableCell>{client.since}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewClient(client.id)}
                        className="flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Visualizar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditClient(client.id)}
                        className="flex items-center"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantManagement;
