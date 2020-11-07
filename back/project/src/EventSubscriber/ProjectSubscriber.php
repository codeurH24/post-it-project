<?php

namespace App\EventSubscriber;

// use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Response;
use Symfony\Component\HttpFoundation\Response;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;

class ProjectSubscriber implements EventSubscriberInterface
{

    private $logger;
    private $tokenStorage;

    public function __construct(LoggerInterface $logger, TokenStorageInterface $tokenStorage)
    {
        $this->logger = $logger;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @return array The event names to listen to
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::CONTROLLER => [
                ['hasFilter', EventPriorities::PRE_READ],
            ],
            KernelEvents::VIEW => [
                ['myResponse', EventPriorities::PRE_RESPOND],
            ]
        ];
    }

    public function myResponse(ViewEvent $event) {
    
        if ($this->httpCall($event, 'GET', '/api/projects')) {
            
            $user = $this->getUser();
    
            $param = $event->getRequest()->query->all();
            
            $this->logger->debug('TEST TEST  mon id ' . $user->getId()  );
            if(isset($param['user'])) {
                if($param['user'] != $user->getId()) {
                    $this->logger->debug('TEST TEST  user id param different: $param[user] ' . $param['user']  );
                    $event->getControllerResult();
                    $response = new Response();
                    $event->setResponse(new JsonResponse([], Response::HTTP_BAD_REQUEST));
                }
            }
        }

    }
    

    private function getUser(): User {
        return $this->tokenStorage->getToken()->getUser();
    }

    private function httpCall($event, $method, $uri) {
        if(strpos($event->getRequest()->getRequestUri(),$uri) === 0) {
            if($event->getRequest()->getRealMethod() === $method) {
                return true;
            }
        }
        return false;
    }

    public function hasFilter(ControllerEvent $event)
    {
        
        
        // if ($this->httpCall($event, 'GET', '/api/projects')) {

        //     // $this->logger->info("TEST TEST /api/projects  ");
        //     // $namedArguments = $event->getRequest()->attributes->all();
        //     $user = $this->getUser();
    
        //     $param = $event->getRequest()->query->all();
            
        //     $this->logger->debug('TEST TEST  mon id ' . $user->getId()  );
        //     if(isset($param['user'])) {
        //         if($param['user'] != $user->getId()) {
        //             $this->logger->debug('TEST TEST  user id param different: $param[user] ' . $param['user']  );
        //             // $event->setResponse(new JsonResponse(null, 204));
        //         }
        //     }
        // }

        

        
        // $this->logger->info("TEST TEST getRequestUri()  " . $event->getRequest()->getRequestUri() );





        // $this->logger->info('TEST TEST url param get user ' . $event->getRequest()->query->get('user'));
        // $this->logger->info('TEST TEST http method ?  ' . $event->getRequest()->getRealMethod() );

        // foreach ($namedArguments['data'] as $key => $project) {
            
        //     $this->logger->debug('TEST TEST key ' . serialize($key) . ' ' .  serialize($project)  );
        //     $this->logger->debug('TEST TEST key ' . $project->getUser() . ' id ' . $user->getId()  );
        // }

        // // first check if this affects the requested resource
        // $resource = $event->getRequest()->attributes->get('_api_resource_class');

        // if (Resource::class !== $resource) {
        //     return;
        // }

        // // second check if this is the get_collection controller
        // $controller = $event->getRequest()->attributes->get('_controller');

        // if ('api_platform.action.get_collection' !== $controller) {
        //     return;
        // }

        // // third validate the required filter is set
        // // we expect a filter via GET parameter 'filter-query-parameter'
        // if (!$event->getRequest()->query->has('filter-query-parameter')) {
        //     
        // }
        // throw new BadRequestHttpException('Filter is required');
    }
}