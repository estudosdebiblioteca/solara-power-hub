
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Battery, CloudSun, SunDim, Zap, TrendingUp, CloudRain } from "lucide-react";

const ClientDashboard = () => {
  // Mock data for the client dashboard
  const plantStats = {
    totalCapacity: "120 kW",
    activeCapacity: "105 kW",
    efficiency: 87,
    status: "Operacional",
    weather: "Parcialmente Nublado",
    temperature: "24°C",
  };

  const productionStats = {
    currentOutput: "84 kW",
    today: "562 kWh",
    thisMonth: "16.840 kWh",
    thisYear: "185.620 kWh",
  };

  const savingsStats = {
    carbonSaved: "94 toneladas",
    financialSavings: "R$ 15.480",
    energyGenerated: "185.620 kWh",
  };

  // Mock weather forecast data
  const forecast = [
    { day: "Hoje", icon: <CloudSun className="h-5 w-5" />, temp: "24°C", production: "92%" },
    { day: "Amanhã", icon: <SunDim className="h-5 w-5" />, temp: "22°C", production: "85%" },
    { day: "Quarta", icon: <CloudSun className="h-5 w-5" />, temp: "25°C", production: "90%" },
    { day: "Quinta", icon: <CloudRain className="h-5 w-5" />, temp: "19°C", production: "65%" },
    { day: "Sexta", icon: <SunDim className="h-5 w-5" />, temp: "23°C", production: "85%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Meu Painel Solar</h1>
        <div className="flex mt-2 sm:mt-0">
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
            Status do Sistema: Online
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Produção Atual</CardTitle>
            <Zap className="h-4 w-4 text-solar-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productionStats.currentOutput}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {plantStats.activeCapacity}/{plantStats.totalCapacity} capacidade
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Eficiência</span>
                <span>{plantStats.efficiency}%</span>
              </div>
              <Progress value={plantStats.efficiency} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Produção de Hoje</CardTitle>
            <TrendingUp className="h-4 w-4 text-solar-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productionStats.today}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {plantStats.weather}, {plantStats.temperature}
            </p>
            <div className="mt-3">
              <div className="flex items-center text-xs space-x-1 text-muted-foreground">
                <CloudSun className="h-3 w-3" />
                <span>Produção ideal: 610 kWh</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Economia de Carbono</CardTitle>
            <Battery className="h-4 w-4 text-solar-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savingsStats.carbonSaved}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Economia financeira: {savingsStats.financialSavings}
            </p>
            <div className="mt-3">
              <div className="flex items-center text-xs space-x-1 text-muted-foreground">
                <Zap className="h-3 w-3" />
                <span>Energia total gerada: {savingsStats.energyGenerated}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Minhas Usinas Solares</CardTitle>
            <CardDescription>
              Desempenho das suas instalações solares
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Telhado Residencial", location: "Residência Principal", capacity: "12 kW", status: "Online", efficiency: 90 },
                { name: "Array da Garagem", location: "Residência Principal", capacity: "8 kW", status: "Online", efficiency: 85 },
                { name: "Casa de Veraneio", location: "Casa do Lago", capacity: "10 kW", status: "Online", efficiency: 88 },
              ].map((plant, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{plant.name}</p>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      {plant.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plant.location}</p>
                  <p className="text-sm">Capacidade: {plant.capacity}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Eficiência</span>
                      <span>{plant.efficiency}%</span>
                    </div>
                    <Progress value={plant.efficiency} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Previsão de Produção</CardTitle>
            <CardDescription>
              Previsão de 5 dias baseada no clima
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between border-b last:border-0 py-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-solar-blue">{day.icon}</div>
                    <div>
                      <p className="font-medium">{day.day}</p>
                      <p className="text-sm text-muted-foreground">{day.temp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {day.production}
                    </span>
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

export default ClientDashboard;
