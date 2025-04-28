
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
    status: "Operational",
    weather: "Partly Cloudy",
    temperature: "24°C",
  };

  const productionStats = {
    currentOutput: "84 kW",
    today: "562 kWh",
    thisMonth: "16,840 kWh",
    thisYear: "185,620 kWh",
  };

  const savingsStats = {
    carbonSaved: "94 tons",
    financialSavings: "$15,480",
    energyGenerated: "185,620 kWh",
  };

  // Mock weather forecast data
  const forecast = [
    { day: "Today", icon: <CloudSun className="h-5 w-5" />, temp: "24°C", production: "92%" },
    { day: "Tomorrow", icon: <SunDim className="h-5 w-5" />, temp: "22°C", production: "85%" },
    { day: "Wednesday", icon: <CloudSun className="h-5 w-5" />, temp: "25°C", production: "90%" },
    { day: "Thursday", icon: <CloudRain className="h-5 w-5" />, temp: "19°C", production: "65%" },
    { day: "Friday", icon: <SunDim className="h-5 w-5" />, temp: "23°C", production: "85%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Solar Dashboard</h1>
        <div className="flex mt-2 sm:mt-0">
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
            System Status: Online
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Output</CardTitle>
            <Zap className="h-4 w-4 text-solar-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productionStats.currentOutput}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {plantStats.activeCapacity}/{plantStats.totalCapacity} capacity
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Efficiency</span>
                <span>{plantStats.efficiency}%</span>
              </div>
              <Progress value={plantStats.efficiency} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Production</CardTitle>
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
                <span>Optimal production: 610 kWh</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Carbon Savings</CardTitle>
            <Battery className="h-4 w-4 text-solar-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savingsStats.carbonSaved}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Financial savings: {savingsStats.financialSavings}
            </p>
            <div className="mt-3">
              <div className="flex items-center text-xs space-x-1 text-muted-foreground">
                <Zap className="h-3 w-3" />
                <span>Total energy generated: {savingsStats.energyGenerated}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Solar Plants</CardTitle>
            <CardDescription>
              Performance of your solar installations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Home Rooftop", location: "Main Residence", capacity: "12 kW", status: "Online", efficiency: 90 },
                { name: "Garage Array", location: "Main Residence", capacity: "8 kW", status: "Online", efficiency: 85 },
                { name: "Vacation Home", location: "Lake House", capacity: "10 kW", status: "Online", efficiency: 88 },
              ].map((plant, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{plant.name}</p>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      {plant.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plant.location}</p>
                  <p className="text-sm">Capacity: {plant.capacity}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Efficiency</span>
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
            <CardTitle>Production Forecast</CardTitle>
            <CardDescription>
              5-day production forecast based on weather
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
