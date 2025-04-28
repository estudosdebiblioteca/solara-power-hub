
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Sun, Users, Zap, TrendingUp } from "lucide-react";

const CompanyDashboard = () => {
  // Mock data for the dashboard
  const plantStats = {
    totalPlants: 12,
    activePlants: 10,
    totalCapacity: "5.8 MW",
    averageEfficiency: "87%",
  };

  const clientStats = {
    totalClients: 24,
    newClientsThisMonth: 3,
    activeContracts: 28,
  };

  const productionStats = {
    dailyProduction: "28.4 MWh",
    monthlyProduction: "850.2 MWh",
    yearlyProduction: "9,542 MWh",
    change: "+12%",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Painel da Empresa</h1>
        <div className="flex mt-2 sm:mt-0">
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Última Atualização: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Usinas</CardTitle>
            <Sun className="h-4 w-4 text-solar-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plantStats.totalPlants}</div>
            <p className="text-xs text-muted-foreground">
              {plantStats.activePlants} usinas ativas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
            <Zap className="h-4 w-4 text-solar-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plantStats.totalCapacity}</div>
            <p className="text-xs text-muted-foreground">
              {plantStats.averageEfficiency} de eficiência média
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-solar-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientStats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {clientStats.newClientsThisMonth} novos este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Produção Diária</CardTitle>
            <TrendingUp className="h-4 w-4 text-solar-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productionStats.dailyProduction}</div>
            <p className="text-xs text-muted-foreground">
              {productionStats.change} em relação a ontem
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral das Usinas</CardTitle>
            <CardDescription>
              Status de todas as usinas solares sob gerenciamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sunny Meadows", location: "Arizona", capacity: "1.2 MW", efficiency: "92%" },
                { name: "Desert Sun", location: "Nevada", capacity: "0.8 MW", efficiency: "89%" },
                { name: "Green Valley", location: "California", capacity: "1.5 MW", efficiency: "85%" },
                { name: "Mountain View", location: "Colorado", capacity: "0.9 MW", efficiency: "88%" },
                { name: "Coastal Energy", location: "Florida", capacity: "1.4 MW", efficiency: "84%" },
              ].map((plant, index) => (
                <div key={index} className="flex items-center justify-between border-b last:border-0 py-2">
                  <div>
                    <p className="font-medium">{plant.name}</p>
                    <p className="text-sm text-muted-foreground">{plant.location}</p>
                  </div>
                  <div className="text-right">
                    <p>{plant.capacity}</p>
                    <p className="text-sm text-muted-foreground">{plant.efficiency} de eficiência</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade dos Clientes</CardTitle>
            <CardDescription>
              Ações e atualizações recentes de clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { client: "John Smith", action: "Visualizou relatório da usina", time: "10 minutos atrás" },
                { client: "Maria Garcia", action: "Solicitou manutenção", time: "1 hora atrás" },
                { client: "Robert Lee", action: "Atualizou método de pagamento", time: "3 horas atrás" },
                { client: "Emma Johnson", action: "Adicionou novo usuário", time: "5 horas atrás" },
                { client: "James Wilson", action: "Baixou fatura", time: "Ontem" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 border-b last:border-0 py-2">
                  <div className="h-8 w-8 rounded-full bg-solar-blue bg-opacity-10 flex items-center justify-center text-solar-blue">
                    {activity.client.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.client}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;
