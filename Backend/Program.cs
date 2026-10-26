using Backend.DB;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
options.UseInMemoryDatabase("DataBase")

);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi();




builder.Services.AddCors(options => {
    options.AddPolicy("AllowReactApp", policy => {
        policy.WithOrigins("http://localhost:5173") // Ensure this matches your React app's exact port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Use the property names exactly as defined in C# (Case-Sensitive)
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = false;

        // Optional: Keep the exact property naming policy (don't convert to camelCase)
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    DbInitializer.AddStartingData(context);
    context.SaveChanges();
}


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("AllowReactApp");


app.MapControllers();

app.Run();