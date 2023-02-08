import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data1: TreeNode[];

  data2: TreeNode[];

  data3: TreeNode[];

  data4: TreeNode[];

  selectedNode: TreeNode;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.data1 = [
      {
        label: 'CEO',
        type: 'person',
        styleClass: 'p-person',
        expanded: true,
        data: { name: 'Walter White', avatar: 'walter.jpg' },
        children: [
          {
            label: 'CFO',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'Saul Goodman', avatar: 'saul.jpg' },
            children: [
              {
                label: 'Tax',
                styleClass: 'department-cfo',
              },
              {
                label: 'Legal',
                styleClass: 'department-cfo',
              },
            ],
          },
          {
            label: 'COO',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'Mike E.', avatar: 'mike.jpg' },
            children: [
              {
                label: 'Operations',
                styleClass: 'department-coo',
              },
            ],
          },
          {
            label: 'CTO',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'Jesse Pinkman', avatar: 'jesse.jpg' },
            children: [
              {
                label: 'Development',
                styleClass: 'department-cto',
                expanded: true,
                children: [
                  {
                    label: 'Analysis',
                    styleClass: 'department-cto',
                  },
                  {
                    label: 'Front End',
                    styleClass: 'department-cto',
                  },
                  {
                    label: 'Back End',
                    styleClass: 'department-cto',
                  },
                ],
              },
              {
                label: 'QA',
                styleClass: 'department-cto',
              },
              {
                label: 'R&D',
                styleClass: 'department-cto',
              },
            ],
          },
        ],
      },
    ];

    this.data2 = [
      {
        label: 'F.C Barcelona',
        expanded: true,
        children: [
          {
            label: 'F.C Barcelona',
            expanded: true,
            children: [
              {
                label: 'Chelsea FC',
              },
              {
                label: 'F.C. Barcelona',
              },
            ],
          },
          {
            label: 'Real Madrid',
            expanded: true,
            children: [
              {
                label: 'Bayern Munich',
              },
              {
                label: 'Real Madrid',
              },
            ],
          },
        ],
      },
    ];

    this.data3 = [
      {
        label: 'חניון בני ברק',
        type: 'parking',
        styleClass: 'parking-node',
        expanded: true,
        data: { maxLimit: 50000 },
        children: [
          {
            label: 'חדר 1',
            type: 'room',
            styleClass: 'room-node',
            expanded: true,
            data: { maxLimit: 15000 },
            children: [
              {
                label: 'אזור 1',
                type: 'room',
                styleClass: 'room-node',
                expanded: true,
                children: [
                  {
                    label: 'T1',
                    type: 'charger',
                    styleClass: 'charger-node',
                    expanded: true,
                    data: { maxLimit: 180, numOfConnectors: 1 },
                    leaf: true,
                  },
                  {
                    label: 'T6',
                    type: 'charger',
                    styleClass: 'charger-node',
                    expanded: true,
                    data: { maxLimit: 180, numOfConnectors: 1 },
                    leaf: true,
                  },
                ],
              },
              {
                label: 'T2',
                type: 'charger',
                styleClass: 'charger-node',
                expanded: true,
                data: { maxLimit: 180, numOfConnectors: 2 },
                leaf: true,
              },
              {
                label: 'T3',
                type: 'charger',
                styleClass: 'charger-node',
                expanded: true,
                data: { maxLimit: 180, numOfConnectors: 1 },
                leaf: true,
              },
            ],
          },
        ],
      },
    ];

    this.data4 = [
      {
        label: 'חניון בני ברק',
        type: 'parking',
        styleClass: 'parking-node',
        expanded: true,
        data: { maxLimit: 50000 },
        children: [
          {
            label: 'חדר 1',
            type: 'room',
            styleClass: 'room-node',
            expanded: true,
            data: { maxLimit: 15000 },
            children: [
              {
                label: 'אזור 1',
                type: 'room',
                styleClass: 'room-node',
                expanded: true,
                children: [
                  {
                    label: 'מטענים',
                    type: 'charger',
                    styleClass: 'charger-node',
                    expanded: true,
                    data: {
                      chargers: [
                        {
                          label: 'T1',
                          numOfConnectors: 2,
                          maxLimit: 180,
                        },
                        {
                          label: 'T2',
                          numOfConnectors: 1,
                          maxLimit: 120,
                        },
                      ],
                    },
                    leaf: true,
                  },
                ],
              },
              {
                label: 'מטענים',
                type: 'charger',
                styleClass: 'charger-node',
                expanded: true,
                data: {
                  chargers: [
                    {
                      label: 'T3',
                      numOfConnectors: 2,
                      maxLimit: 180,
                    },
                    {
                      label: 'T4',
                      numOfConnectors: 1,
                      maxLimit: 120,
                    },
                  ],
                },
                leaf: true,
              },
            ],
          },
        ],
      },
    ];
  }

  onNodeSelect(event) {
    this.messageService.add({
      severity: 'success',
      summary: 'Node Selected',
      detail: event.node.label,
    });
  }

  deleteNode(node) {
    console.log('delete node', node);
    this.data3 = this.data3
      ?.filter((item) => item.label !== node.label)
      ?.map((item) => ({
        ...item,
        children: this.deleteNodeFromChildren(item.children, node),
      }));
  }

  deleteNodeFromChildren(children, node) {
    return children
      ?.filter((item) => item.label !== node.label)
      ?.map((item) => ({
        ...item,
        children: this.deleteNodeFromChildren(item.children, node),
      }));
  }

  addChild(node) {
    node.children.push({
      label: 'חדר 100',
      type: 'room',
      styleClass: 'room-node',
      expanded: true,
      data: { maxLimit: 15000 },
    });
  }
}
