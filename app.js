import { App } from '@slack/bolt';

/**
 * This sample Slack application uses Socket Mode.
 * For the companion getting started setup guide, see:
 * https://docs.slack.dev/tools/bolt-js/getting-started/
 */

// Initializes your app with your bot token and app token
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

app.command('/opportunity', async ({ ack, body, client, logger,  }) => {
  await ack();

  try {
    const result = await client.views.open({

      trigger_id: body.trigger_id,

      view: {
        type: 'modal',
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Submit Opportunity',
        },

        submit: {
          type: 'plain_text',
          text: 'Submit',
        },

        close: {
          type: 'plain_text',
          text: "Cancel"
        },

        blocks: [
          {

            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Announce an opportunity with the application link!'
            },
          },

          {
            type: 'input',
            block_id: 'input_c',
            label: {
              type: 'plain_text',
              text: 'Submit',
            },
            element: {
              type: 'plain_text_input',
              action_id: 'dreamy_input',
              multiline: true,
            }
          }
        ]

            // accessory: {
            //   type: 'button',
            //   text: {
            //     type: 'plain_text',
            //     text: 'Submit',
            //   },
            //   action_id: 'button_abc'
            // }
      }

    });
    logger.info(result);
  }
  catch (error) {
    console.error(error.data?.response_metadata?.messages);
    logger.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  app.logger.info('⚡️ Bolt app is running!');
})();
