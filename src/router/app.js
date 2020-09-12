import applayout from "../layouts/applayout.vue";
import dashboard from "../views/app/dashboard.vue";
import overview from "../views/app/overview.vue";
import profile from "../views/app/profile.vue";
import drivers from "../views/app/drivers.vue";
import jobs from "../views/app/jobs.vue";
import vehicles from "../views/app/vehicles.vue";
import unassignedcars from "../views/app/unassignedcars.vue";
import assignedcars from "../views/app/assignedcars.vue";
export default [
  {
    path: "/app",
    name: "applayout",
    component: applayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: dashboard
      },
      {
        path: "/profile",
        name: "profile",
        component: profile
      },
      {
        path: "/vehicles",
        name: "vehicles",
        component: vehicles,
        children: [
          {
            path: "/vehicles/unassigned-cars",
            component: unassignedcars,
            name: "vehicles"
          },
          {
            path: "/vehicles/assigned-cars",
            component: assignedcars,
            name: "vehicles"
          }
        ]
      },
      {
        path: "/drivers/:id",
        name: "drivers",
        component: drivers
      },
      {
        path: "/overview",
        name: "overview",
        component: overview
      },
      {
        path: "/jobs",
        name: "jobs",
        component: jobs
      }
    ]
  }
];
