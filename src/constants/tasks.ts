const DEFAULT_CARDS: {
  id: number;
  title: string;
  status: string;
}[]
= [
    // REVIEW
    { 
      title: "Look into render bug in dashboard", 
      id: 1, 
      status: "review" 
    },
    { 
      title: "SOX compliance checklist", 
      id: 2, 
      status: "review" 
    },
    { 
      title: "[SPIKE] Migrate to Azure", 
      id: 3, 
      status: "review" 
    },
    { 
      title: "Document Notifications service", 
      id: 4, 
      status: "backlog" 
    },
    // TODO
    {
      title: "Research DB options for new microservice",
      id: 5,
      status: "todo",
    },
    { 
      title: "Postmortem for outage", 
      id: 6, 
      status: "todo" 
    },
    { 
      title: "Sync with product on Q3 roadmap", 
      id: 7, 
      status: "todo" },
  
    // DOING
    {
      title: "Refactor context providers to use Zustand",
      id: 8,
      status: "doing",
    },
    { 
      title: "Add logging to daily CRON", 
      id: 9, 
      status: "doing" 
    },
    // DONE
    {
      title: "Set up DD dashboards for Lambda listener",
      id: 10,
      status: "done",
    },
    ];
  
  export default DEFAULT_CARDS;