import React from 'react'
import { Grid, Item, Segment } from 'semantic-ui-react'

export default function ProfitListItem({appointment}) {
  console.log(appointment);
    return (
        <Segment.Group>
        <Segment textAlign='center'>
        <Item.Group>
            <Grid>
              <Grid.Column width={16}>
                <Item>
                  <Item.Content>programari</Item.Content>
                </Item>
              </Grid.Column>
            </Grid>
          </Item.Group>
        </Segment>
      </Segment.Group>
    )
}
