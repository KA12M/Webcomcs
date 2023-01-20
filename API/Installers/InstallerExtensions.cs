namespace API.Installers
{
    public static class InstallerExtensions
    {
        public static void MyInstallerExtensions(this IServiceCollection services, WebApplicationBuilder builder)
        {
            //ทำการแสกนหาตัวที่สืบทอดมาจาก interface
            var installerList = typeof(Program).Assembly.ExportedTypes.Where(x =>
                typeof(IInstallers).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                .Select(Activator.CreateInstance).Cast<IInstallers>().ToList();

            //ทำการลงทะเบียน DI
            installerList.ForEach(installer => installer.InstallServices(builder));
        }
    }
}