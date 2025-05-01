
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Database, Globe, Shield, Save, Loader2 } from "lucide-react";
import { configService } from "@/services/config.service";

const Configuration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "AdmSun",
    language: "pt-BR",
    enableNotifications: true,
  });

  const [databaseSettings, setDatabaseSettings] = useState({
    host: "",
    port: "3306",
    username: "",
    password: "",
    database: "",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: 90,
    sessionTimeout: 30,
  });

  useEffect(() => {
    const fetchConfigurations = async () => {
      setIsLoading(true);
      try {
        // Fetch general settings
        const generalConfigs = await configService.getConfigByCategory('general');
        if (generalConfigs.length > 0) {
          const configMap = generalConfigs.reduce((acc: any, config) => {
            acc[config.key] = config.value;
            return acc;
          }, {});
          
          setGeneralSettings({
            companyName: configMap.companyName || "AdmSun",
            language: configMap.language || "pt-BR",
            enableNotifications: configMap.enableNotifications === "true",
          });
        }

        // Fetch database settings
        const dbConfigs = await configService.getConfigByCategory('database');
        if (dbConfigs.length > 0) {
          const configMap = dbConfigs.reduce((acc: any, config) => {
            acc[config.key] = config.value;
            return acc;
          }, {});
          
          setDatabaseSettings({
            host: configMap.host || "",
            port: configMap.port || "3306",
            username: configMap.username || "",
            password: configMap.password || "",
            database: configMap.database || "",
          });
        }

        // Fetch security settings
        const securityConfigs = await configService.getConfigByCategory('security');
        if (securityConfigs.length > 0) {
          const configMap = securityConfigs.reduce((acc: any, config) => {
            acc[config.key] = config.value;
            return acc;
          }, {});
          
          setSecuritySettings({
            twoFactorAuth: configMap.twoFactorAuth === "true",
            passwordExpiry: parseInt(configMap.passwordExpiry || "90"),
            sessionTimeout: parseInt(configMap.sessionTimeout || "30"),
          });
        }
      } catch (error) {
        console.error("Error fetching configurations:", error);
        toast.error("Erro ao carregar configurações");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfigurations();
  }, []);

  const handleGeneralSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDatabaseSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatabaseSettings({
      ...databaseSettings,
      [name]: value,
    });
  };

  const handleSecuritySettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSwitchChange = (checked: boolean, name: string) => {
    if (name.startsWith("general-")) {
      const key = name.replace("general-", "") as keyof typeof generalSettings;
      setGeneralSettings({
        ...generalSettings,
        [key]: checked,
      });
    } else if (name.startsWith("security-")) {
      const key = name.replace("security-", "") as keyof typeof securitySettings;
      setSecuritySettings({
        ...securitySettings,
        [key]: checked,
      });
    }
  };

  const saveGeneralSettings = async () => {
    try {
      const success = await configService.saveBulkConfig([
        { key: "companyName", value: generalSettings.companyName, category: "general" },
        { key: "language", value: generalSettings.language, category: "general" },
        { key: "enableNotifications", value: generalSettings.enableNotifications.toString(), category: "general" },
      ]);
      
      if (success) {
        toast.success("Configurações gerais salvas com sucesso!");
      }
    } catch (error) {
      console.error("Error saving general settings:", error);
      toast.error("Erro ao salvar configurações gerais");
    }
  };

  const saveDatabaseSettings = async () => {
    try {
      const success = await configService.saveBulkConfig([
        { key: "host", value: databaseSettings.host, category: "database" },
        { key: "port", value: databaseSettings.port, category: "database" },
        { key: "username", value: databaseSettings.username, category: "database" },
        { key: "password", value: databaseSettings.password, category: "database" },
        { key: "database", value: databaseSettings.database, category: "database" },
      ]);
      
      if (success) {
        toast.success("Configurações de banco de dados salvas com sucesso!");
      }
    } catch (error) {
      console.error("Error saving database settings:", error);
      toast.error("Erro ao salvar configurações de banco de dados");
    }
  };

  const saveSecuritySettings = async () => {
    try {
      const success = await configService.saveBulkConfig([
        { key: "twoFactorAuth", value: securitySettings.twoFactorAuth.toString(), category: "security" },
        { key: "passwordExpiry", value: securitySettings.passwordExpiry.toString(), category: "security" },
        { key: "sessionTimeout", value: securitySettings.sessionTimeout.toString(), category: "security" },
      ]);
      
      if (success) {
        toast.success("Configurações de segurança salvas com sucesso!");
      }
    } catch (error) {
      console.error("Error saving security settings:", error);
      toast.error("Erro ao salvar configurações de segurança");
    }
  };

  if (isLoading) {
    return (
      <div className="container py-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-solar-blue" />
          <p className="text-muted-foreground">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Banco de Dados
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Ajuste as configurações gerais da aplicação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={generalSettings.companyName}
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Input
                    id="language"
                    name="language"
                    value={generalSettings.language}
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableNotifications">Ativar Notificações</Label>
                  <Switch
                    id="enableNotifications"
                    name="general-enableNotifications"
                    checked={generalSettings.enableNotifications}
                    onCheckedChange={(checked) => handleSwitchChange(checked, "general-enableNotifications")}
                  />
                </div>
              </div>
              <Button onClick={saveGeneralSettings} className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Banco de Dados</CardTitle>
              <CardDescription>
                Configure a conexão com o banco de dados MySQL
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="host">Host</Label>
                  <Input
                    id="host"
                    name="host"
                    placeholder="212.47.72.178"
                    value={databaseSettings.host}
                    onChange={handleDatabaseSettingChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="port">Porta</Label>
                  <Input
                    id="port"
                    name="port"
                    placeholder="3306"
                    value={databaseSettings.port}
                    onChange={handleDatabaseSettingChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="admsun"
                    value={databaseSettings.username}
                    onChange={handleDatabaseSettingChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="******"
                    value={databaseSettings.password}
                    onChange={handleDatabaseSettingChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="database">Nome do Banco</Label>
                  <Input
                    id="database"
                    name="database"
                    placeholder="adm_sun_login"
                    value={databaseSettings.database}
                    onChange={handleDatabaseSettingChange}
                  />
                </div>
              </div>
              <Button onClick={saveDatabaseSettings} className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações do Banco
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Ajuste as configurações de segurança da aplicação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactorAuth">Autenticação de Dois Fatores</Label>
                  <Switch
                    id="twoFactorAuth"
                    name="security-twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSwitchChange(checked, "security-twoFactorAuth")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passwordExpiry">Expiração de Senha (dias)</Label>
                  <Input
                    id="passwordExpiry"
                    name="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={handleSecuritySettingChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecuritySettingChange}
                  />
                </div>
              </div>
              <Button onClick={saveSecuritySettings} className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações de Segurança
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuration;
