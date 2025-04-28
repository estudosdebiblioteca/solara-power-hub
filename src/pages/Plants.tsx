
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sun, Plus, Users, MapPin, Zap, AlertCircle, CheckCircle } from "lucide-react";

const Plants = () => {
  // Mock data for solar plants
  const plants = [
    {
      id: 1,
      name: "Sunny Meadows",
      location: "Arizona",
      capacity: "1.2 MW",
      clients: 5,
      efficiency: 92,
      status: "operational",
      alerts: 0,
    },
    {
      id: 2,
      name: "Desert Sun",
      location: "Nevada",
      capacity: "0.8 MW",
      clients: 3,
      efficiency: 89,
      status: "operational",
      alerts: 1,
    },
    {
      id: 3,
      name: "Green Valley",
      location: "California",
      capacity: "1.5 MW",
      clients: 7,
      efficiency: 85,
      status: "maintenance",
      alerts: 2,
    },
    {
      id: 4,
      name: "Mountain View",
      location: "Colorado",
      capacity: "0.9 MW",
      clients: 4,
      efficiency: 88,
      status: "operational",
      alerts: 0,
    },
    {
      id: 5,
      name: "Coastal Energy",
      location: "Florida",
      capacity: "1.4 MW",
      clients: 6,
      efficiency: 84,
      status: "operational",
      alerts: 1,
    },
  ];

  const getStatusBadge = (status: string, alerts: number) => {
    if (status === "maintenance") {
      return (
        <div className="flex items-center text-orange-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>Manutenção</span>
        </div>
      );
    }
    
    if (alerts > 0) {
      return (
        <div className="flex items-center text-amber-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>Alerta{alerts > 1 ? 's' : ''}</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center text-green-600">
        <CheckCircle className="h-4 w-4 mr-1" />
        <span>Operacional</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Usinas Solares</h1>
        <Button className="mt-2 sm:mt-0">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Nova Usina
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Usinas</CardTitle>
            <Sun className="h-4 w-4 text-solar-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plants.length}</div>
            <p className="text-xs text-muted-foreground">
              {plants.filter(p => p.status === "operational").length} usinas operacionais
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
            <Zap className="h-4 w-4 text-solar-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.8 MW</div>
            <p className="text-xs text-muted-foreground">
              Eficiência média: 87%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-solar-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              Em todas as usinas
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visão Geral das Usinas</CardTitle>
          <CardDescription>
            Gerencie e monitore todas as usinas solares
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {plants.map((plant) => (
              <div key={plant.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="solar-gradient rounded p-2">
                      <Sun className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{plant.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {plant.location}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(plant.status, plant.alerts)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Capacidade</p>
                    <p className="font-medium">{plant.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Clientes</p>
                    <p className="font-medium">{plant.clients}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Eficiência</span>
                      <span>{plant.efficiency}%</span>
                    </div>
                    <Progress value={plant.efficiency} className="h-1.5" />
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">Detalhes</Button>
                  <Button variant="outline" size="sm">Gerenciar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Plants;
